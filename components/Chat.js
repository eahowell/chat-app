import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  Day,
  Message,
  InputToolbar,
} from "react-native-gifted-chat";
import colorMatrix from "../colorMatrix";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatabaseContext from "../DatabaseContext";

const Chat = ({ route, navigation, isConnected }) => {
  const { name, chatBackgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const { db } = useContext(DatabaseContext);

  const selectedColorScheme = colorMatrix.find(
    (color) => color.backgroundColor === chatBackgroundColor
  );

  const loadCachedLists = async (listToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(listToCache));
    } catch (error) { 
      console.error("Error loading messages from cache:", error.code, error.message);
    }
  };
  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // Unregister current onSnapshot() listener to avoid registering multiple listeners when the connection is re-established
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, async (querySnapshot) => {
        let newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
          });
        });
        loadCachedLists(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedLists();
    
    // Clean up the listener
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: selectedColorScheme.bubbleColor,
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
        textStyle={{
          right: {
            color: selectedColorScheme.bubbleColorText,
          },
        }}
        timeTextStyle={{
          right: {
            color: selectedColorScheme.bubbleColorText,
          },
          left: {
            color: "Black",
          },
        }}
        accessibilityLabel={`Message from ${props.currentMessage.user.name}: ${props.currentMessage.text}`}
        accessibilityRole="text"
      />
    );
  };

  const renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      textStyle={{
        color: selectedColorScheme.systemMessageTextColor,
      }}
    />
  );

  const renderDay = (props) => (
    <Day
      {...props}
      textStyle={{
        color: selectedColorScheme.systemMessageTextColor,
      }}
    />
  );

  const renderMessage = (props) => {
    return (
      <View>
        {props.position === "left" && (
          <Text
            style={styles.nameText}
            textStyle={{ coler: selectedColorScheme.systemMessageTextColor }}
          >
            {props.currentMessage.user.name}
          </Text>
        )}
        <Message {...props} />
      </View>
    );
  };

  const onSend = async (newMessages = []) => {
    const { _id, createdAt, text, user } = newMessages[0];
    try {
      await addDoc(collection(db, "messages"), {
        _id,
        createdAt,
        text,
        user,
      });
    } catch (error) {
      console.error(
        "Error adding message to Firestore:",
        error.code,
        error.message
      );
    }
  };

  const renderInputToolbar = (props) => {
    if (isConnected === false) {
      return (
        <InputToolbar
          {...props}
          text="No network connection"
          textInputStyle={{ color: "grey" }}
          primaryStyle={{ backgroundColor: "lightgrey" }}
        />
      );
    }
    return <InputToolbar {...props} />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: chatBackgroundColor }]}
    >
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderDay={renderDay}
        renderMessage={renderMessage}
        renderInputToolbar={renderInputToolbar}
        maxComposerHeight={100}
        minComposerHeight={Platform.OS === "ios" ? 40 : 60}
        textInputProps={{
          importantForAccessibility: "yes",
          accessible: true,
          accessibilityRole: "text",
          accessibilityHint: "Type your message here",
          accessibilityLabel: null,
          multiline: true,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  nameText: {
    fontSize: 12,

    marginLeft: 10,
    marginBottom: 2,
  },
});

export default Chat;
