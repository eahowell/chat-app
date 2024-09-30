import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useState } from "react";

const image = require("../assets/background-image.png");

// Get the window dimensions so that the design spec percentages can be calculated
const { height, width } = Dimensions.get('window');

// Define the SVG as a string so it can be rendered
const personIconSvg = `
<svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <defs>
        <path d="M12,13.2533333 C15.24,13.2533333 21.6,14.830125 21.6,18.105 L21.6,20.5308333 L2.4,20.5308333 L2.4,18.105 C2.4,14.830125 8.76,13.2533333 12,13.2533333 Z M20.64,19.5708333 L20.64,18.105 C20.64,16.0913979 15.9773097,14.2133333 12,14.2133333 C8.02269035,14.2133333 3.36,16.0913979 3.36,18.105 L3.36,19.5708333 L20.64,19.5708333 Z M12,11.36 C9.624,11.36 7.68,9.443 7.68,7.1 C7.68,4.757 9.624,2.84 12,2.84 C14.376,2.84 16.32,4.757 16.32,7.1 C16.32,9.443 14.376,11.36 12,11.36 Z M12,10.4 C13.8487889,10.4 15.36,8.90977792 15.36,7.1 C15.36,5.29022208 13.8487889,3.8 12,3.8 C10.1512111,3.8 8.64,5.29022208 8.64,7.1 C8.64,8.90977792 10.1512111,10.4 12,10.4 Z" id="path-1"></path>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="iPhone-XR" transform="translate(-58.000000, -389.000000)">
            <g id="Form" transform="translate(24.000000, 355.000000)">
                <g id="Form-Field_Name" transform="translate(16.000000, 16.000000)">
                    <g id="icon" transform="translate(16.000000, 16.000000)">
                        <rect id="bounds" x="0" y="0" width="24" height="23.6666667"></rect>
                        <mask id="mask-2" fill="white">
                            <use xlink:href="#path-1"></use>
                        </mask>
                        <use id="profile" fill="#757083" fill-rule="nonzero" xlink:href="#path-1"></use>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
`;

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("#090C08");

  const backgroundColorChoices = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Chatly</Text>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        ></KeyboardAvoidingView>
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            {/* Using platform to so the svg can be rendered properly based on bed vs mobile */}
            {Platform.OS === 'web' 
              ? <img src={`data:image/svg+xml;utf8,${encodeURIComponent(personIconSvg)}`} alt="Person Icon" style={styles.inputIcon} />
              : <SvgXml xml={personIconSvg} width={20} height={20} style={styles.inputIcon} />
            }
            <TextInput
            // Styles the color of the text input based on if it's the placeholder or active text to help with readability
              style={[styles.textInput, name ? styles.textInputActive : null]}
              value={name}
              role="textbox"
              accessibilityHint="Lets you type your name"
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>
          <View style={styles.colorChoiceSection}>
            <Text style={styles.backgroundChoiceText}>
              Choose Background Color
            </Text>
            <View style={styles.backgroundChoiceContainer}>
              {backgroundColorChoices.map((color) => (
                <View key={color} style={styles.colorButtonWrapper}>
                  {/* Used Pressable because  TouchableOpacity is deprecated*/}
                  <Pressable
                    accessible={true}
                    role="button"
                    accessibilityHint={`Lets you choose ${color} as the background color for the chat room`}
                    style={[styles.backgroundChoiceButtons, { backgroundColor: color }]}
                    onPress={() => setSelectedBackgroundColor(color)}
                  />
                  {selectedBackgroundColor === color && (
                    <View style={[styles.selectedRing, { borderColor: color }]} />
                  )}
                </View>
              ))}
            </View>
          </View>
          <Pressable
            style={styles.buttonStartChat}
            accessible={true}
            role="button"
            accessibilityHint="Lets you enter the chat room"
            onPress={() => navigation.navigate("Chat", {
              name: name,
              backgroundColor: selectedBackgroundColor,
            })}
          >
            <Text style={styles.buttonStartChatText}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
    height: "100%",
    width: "100%",
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    margin: 80,
  },
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.44,
    width: width * 0.88,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    borderColor: "#757083",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
    opacity: 0.5,
  },
  textInputActive: {
    color: "#757083",
    opacity: 1,
  },
  colorChoiceSection: {
    width: "88%",
  },
  backgroundChoiceContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backgroundChoiceText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    marginBottom: 10,
  },
  colorButtonWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  backgroundChoiceButtons: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedRing: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
  },
  buttonStartChat: {
    backgroundColor: "#757083",
    width: "88%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonStartChatText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
