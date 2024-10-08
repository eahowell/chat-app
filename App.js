// App.js
import React from "react";
import { StyleSheet, LogBox, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import DatabaseContext from "./DatabaseContext";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

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
const db = getFirestore(app);

// Lazy initialization of Firebase Auth
let auth;
function getFirebaseAuth() {
  if (!auth) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
  return auth;
}


export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const connectionStatus = useNetInfo();

  useEffect(() => {
    setIsConnected(connectionStatus.isConnected);
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

    // Initialize auth here to ensure it's only done once per app lifecycle
    const auth = getFirebaseAuth();

  return (
    <DatabaseContext.Provider value={{ db, auth }}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat">
            {(props) => <Chat {...props} isConnected={isConnected} />}
          </Stack.Screen>
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
