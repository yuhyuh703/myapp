import { Text, View, Pressable, Button } from "react-native";
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';



export default function Transfers() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/list.tsx to edit this screen.</Text>
      <Link href="/matches" asChild>
      <Pressable>
        <Button
          title="matches"
          onPress={() => router.push('./matches')}
        />
      </Pressable>
    </Link>
    <Text onPress={() => router.push('./matches')}>Go matches</Text>
    </View>
  );
}
