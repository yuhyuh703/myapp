import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function Layout() {
  return (
   <Tabs>
    <Tabs.Screen name="matches" options={{headerShown: false}}/>
    <Tabs.Screen name="transfers" />
   </Tabs>
  );
}
