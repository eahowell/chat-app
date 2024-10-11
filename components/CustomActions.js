import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null);
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        let mediaLibraryPermissions =
          await MediaLibrary.requestPermissionsAsync();

        if (mediaLibraryPermissions?.granted)
          await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);

        setImage(result.assets[0]);
      } else setImage(null);
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend([
          {
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            },
          },
        ]);
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 2,
    justifyContent: "center",
    alignSelf: "center",
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default CustomActions;
