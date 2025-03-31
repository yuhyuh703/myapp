import { Text, View, Pressable, Button } from "react-native";
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';



export default function Transfers() {

fetch("https://v3.football.api-sports.io/transfers?team=33", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "ab47b5280ce2161a4699fd720347734c"
	}
})
.then(response => {
  const data = response.json();
	console.log(data);
})
.catch(err => {
	console.log(err);
});



  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/transfers.tsx to edit this screen.</Text>
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
