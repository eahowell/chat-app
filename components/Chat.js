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
  Composer,
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

  const cacheMessages = async (messagesToCache) => {
    try {
      if (messagesToCache && messagesToCache.length > 0) {
        await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
      }
    } catch (error) {
      console.error("Error caching messages:", error.code, error.message);
    }
  };

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("messages");
      if (cachedMessages !== null) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.error(
        "Error loading messages from cache:",
        error.code,
        error.message
      );
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
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

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

  // Show an offline message in the input toolbar if there is no network connection
  const renderInputToolbar = (props) => {
    if (isConnected === true) {
      return <InputToolbar {...props} />;
    } else {
      return (
        <View style={styles.offlineInputToolbar}>
          <Text style={styles.offlineTextInput}>No network connection</Text>
        </View>
      );
    }
  };

  // Disable the composer if there is no network connection
  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={isConnected === false ? styles.offlineTextInput : null}
        disableComposer={isConnected === false ? false : true}
      />
    );
  };

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
        renderComposer={renderComposer}
        maxComposerHeight={100}
        minComposerHeight={Platform.OS === "ios" ? 40 : 60}
        textInputProps={{
          importantForAccessibility: "yes",
          accessible: true,
          accessibilityRole: "text",
          accessibilityHint: isConnected
            ? "Type your message here"
            : "No network connection",
          accessibilityLabel: null,
          multiline: true,
          editable: isConnected,
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
  offlineInputToolbar: {
    backgroundColor: "lightgrey",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  offlineTextInput: {
    color: "black",
    fontSize: 16,
  },
});

export default Chat;
