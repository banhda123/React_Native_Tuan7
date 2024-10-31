import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Add({ route, navigation }) {
  const { id = null, todo = "" } = route?.params || {};
  const [title, setTitle] = useState(todo ? todo : "");
  const [isFocused, setIsFocused] = useState(false);
  const handleCreate = async () => {
    try {
      await fetch(`https://670b3789ac6860a6c2cb6c69.mockapi.io/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, state: false }),
      });
      navigation.navigate("Todo");
    } catch (error) {
      console.error("Error create todo:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      await fetch(`https://670b3789ac6860a6c2cb6c69.mockapi.io/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, state: false }),
      });
      navigation.navigate("Todo");
    } catch (error) {
      console.error("Error update todo:", error);
    }
  };
  const handleAdd = () => {
    title ? (id ? handleUpdate() : handleCreate()) : null;
  };
  return (
    <View style={styles.container}>
      <View style={styles.navigate}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={require("../assets/icons/arrow_back.svg")} />
        </Pressable>
        <View style={styles.info}>
          <View style={styles.ava_content}>
            <Image
              source={require("../assets/img/avata.png")}
              style={styles.img}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={[styles.font, { marginLeft: 8 }]}>Hi Twinkle</Text>
            <Text style={[styles.font, { color: "#9095A0", fontSize: 14 }]}>
              Have a great day ahead
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={[styles.font, { fontSize: 32, textAlign: "center" }]}>
          ADD YOUR JOB
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <View
          style={[
            styles.input_group,
            { borderColor: isFocused ? "#00BDD6" : "#9095A0" },
          ]}
        >
          <Image source={require("../assets/icons/document_icon.svg")} />
          <TextInput
            style={styles.input}
            value={title ? title : ""}
            placeholder="input your job"
            placeholderTextColor={"#BCC1CA"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
      </View>
      <View style={{ marginTop: 50, alignSelf: "center" }}>
        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.text_button}>FINISH {"->"}</Text>
        </Pressable>
      </View>
      <View style={styles.logo}>
        <Image
          source={require("../assets/img/logo.png")}
          resizeMode="cover"
          style={styles.img}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  font: {
    fontSize: 20,
    fontWeight: "700",
    color: "#171A1F",
  },
  navigate: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  ava_content: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
    backgroundColor: "#D9CBF6",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 190,
    height: 170,
    alignSelf: "center",
    marginTop: 50,
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
