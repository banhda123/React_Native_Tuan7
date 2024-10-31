import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";

const Item = ({ data, onToggle, onDelete, onUpdate }) => {
  return (
    <View style={styles.item}>
      <Pressable style={styles.button_check} onPress={() => onToggle(data)}>
        {data.state ? (
          <Image source={require("../assets/icons/check.svg")} />
        ) : null}
      </Pressable>
      <Text
        style={[styles.font, styles.item_title]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {data.title}
      </Text>
      <View style={styles.btn_item_group}>
        <Pressable onPress={() => onUpdate(data.id)}>
          <Image source={require("../assets/icons/update.svg")} />
        </Pressable>
        <Pressable onPress={() => onDelete(data.id)}>
          <Image source={require("../assets/icons/delete.svg")} />
        </Pressable>
      </View>
    </View>
  );
};

export default function Todo({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTodos();
    }
  }, [isFocused]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://670b3789ac6860a6c2cb6c69.mockapi.io/todos"
      );
      const json = await response.json();
      setTodos(json);
      setFilteredTodos(json);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleToggle = async (todo) => {
    const updatedTodo = { ...todo, state: !todo.state };
    const updatedTodos = todos.map((t) => (t.id === todo.id ? updatedTodo : t));
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    try {
      await fetch(
        `https://670b3789ac6860a6c2cb6c69.mockapi.io/todos/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleDelete = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    try {
      await fetch(`https://670b3789ac6860a6c2cb6c69.mockapi.io/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleUpdate = (id) => {
    const todo = todos.find((t) => t.id === id);
    navigation.navigate("Edit", { id: id, todo: todo.title });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) =>
        todo.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTodos(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <Item
      data={item}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.navigate}>
        <Pressable onPress={() => navigation.goBack()}>
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

      <View style={styles.searchSection}>
        <Image source={require("../assets/icons/search.svg")} />
        <TextInput
          style={styles.input}
          placeholder="Search todos"
          value={searchText}
          onChangeText={handleSearch}
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={styles.todos}>
        {loading ? (
          <ActivityIndicator size="large" color="#8353E2" />
        ) : (
          <FlatList
            data={filteredTodos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <View style={styles.add}>
        <Pressable
          style={styles.button_add}
          onPress={() => navigation.navigate("Edit")}
        >
          <Image source={require("../assets/icons/add.svg")} />
        </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
  searchSection: {
    width: 335,
    paddingHorizontal: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#9095A0",
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 4,
    color: "#424242",
    outlineStyle: "none",
  },
  todos: {
    marginTop: 20,
    alignSelf: "center",
    flex: 3,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#DEE1E678",
    alignItems: "center",
    justifyContent: "center",
    width: 335,
    padding: 10,
    borderRadius: 24,
    marginBottom: 10,
    boxShadow: " 0px 0px 2px 0px #171A1F1F",
  },
  item_title: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  btn_item_group: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 10,
  },
  button_check: {
    alignItems: "center",
    justifyContent: "center",
    width: 15,
    height: 18,
    borderColor: "#14923E",
    borderWidth: 1,
  },
  add: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
  },
  button_add: {
    width: 69,
    height: 69,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00BDD6",
    borderRadius: "50%",
  },
});
