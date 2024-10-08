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
} from "react-native-gifted-chat";
import colorMatrix from "../colorMatrix";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import  DatabaseContext  from "../DatabaseContext";

const Chat = ({ route, navigation }) => {
  const { name, chatBackgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const { db } = useContext(DatabaseContext);

  const selectedColorScheme = colorMatrix.find(
    (color) => color.backgroundColor === chatBackgroundColor
  );

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (querySnapshot) => {
      let newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user,
        });
      });
      setMessages(newMessages);
    });
    // Clean upd
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

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
        {props.position === 'left' && (
          <Text style={styles.nameText} textStyle={{coler: selectedColorScheme.systemMessageTextColor}}>{props.currentMessage.user.name}</Text>
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
      console.error("Error adding message to Firestore:", error.code, error.message);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: chatBackgroundColor }]}
    >
      
      {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
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
