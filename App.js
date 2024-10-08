// App.js
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Start from "./components/Start";
import Chat from "./components/Chat";
import DatabaseContext from "./DatabaseContext";

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCz_DYieJvC0GzByxGt9nWQeWlFwyL9P6M",
    authDomain: "chatapp-5aeb4.firebaseapp.com",
    projectId: "chatapp-5aeb4",
    storageBucket: "chatapp-5aeb4.appspot.com",
    messagingSenderId: "39442527552",
    appId: "1:39442527552:web:41005049dcc4bd2dbcb6a5",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <DatabaseContext.Provider value={{ db, auth }}>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
