import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Add from "./displays/add";
import Todo from "./displays/todos";
import Welcome from "./displays/welcom";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Welcome} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Edit" component={Add} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
