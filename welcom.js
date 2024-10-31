import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Welcome({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/img/logo.png")}
          resizeMode="cover"
          style={styles.logo_img}
        />
      </View>
      <View style={{ marginTop: 42 }}>
        <Text style={styles.text_logo}>MANAGE YOUR</Text>
        <Text style={styles.text_logo}>TASK</Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <View
          style={[
            styles.input_group,
            { borderColor: isFocused ? "#00BDD6" : "#9095A0" },
          ]}
        >
          <Image source={require("../assets/icons/mail_icon.svg")} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={"#BCC1CA"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
      <View style={{ marginTop: 80, alignSelf: "center" }}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Todo");
          }}
        >
          <Text style={styles.text_button}>GET STARTED {"->"}</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 243,
    height: 243,
    alignSelf: "center",
    marginTop: 42,
  },
  logo_img: {
    width: "100%",
    height: "100%",
  },
  text_logo: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    lineHeight: 32,
    color: "#8353E2",
  },
  input_group: {
    flex: 1,
    alignSelf: "center",
    width: 334,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    outlineStyle: "none",
  },
  button: {
    backgroundColor: "#00BDD6",
    paddingHorizontal: 30,
    paddingVertical: 9,
    borderRadius: 12,
  },
  text_button: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
