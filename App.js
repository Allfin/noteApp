import NoteProvider from "./App/context/NoteProvider";
import NoteScreen from "./App/screens/NoteScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteDetail from "./App/components/NoteDetail";

const Stack = createNativeStackNavigator();

const data = {
  dimana: "Disana",
};

export default function App() {
  const RenderNoteScreen = (props) => <NoteScreen {...props} data={data} />;
  const RenderNoteDetail = (props) => <NoteDetail {...props} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="NoteScreen" component={RenderNoteScreen} />
          <Stack.Screen name="NoteDetails" component={RenderNoteDetail} />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}
