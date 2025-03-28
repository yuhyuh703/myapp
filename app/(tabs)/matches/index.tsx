import { View, Pressable, SectionList } from "react-native";
import { List, Card, Divider, Text, Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Match } from "./types/matchesTypes";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


const URL = "https://v3.football.api-sports.io/fixtures";
const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
const API_URL = `${URL}?date=${today}`;
const API_KEY = "ab47b5280ce2161a4699fd720347734c";


export default function Matches() {

  const [matches, setMatches] = useState<{ title: string; data: Match[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //const [date, setDate] = useState<string>;

  useEffect(() => {
    console.log("Matches component mounted");
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "x-apisports-key": API_KEY },
      });
      const data: { response: Match[] } = await response.json(); 
      setMatches(formatMatches(data));
    } catch (error) {
      console.error("Error fetching live results:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to format matches grouped by league
  const formatMatches = (data: { response: Match[] }): { title: string; data: Match[] }[] => {
    // Group matches by league ID
    const groupedMatches: Record<number, Match[]> = data.response.reduce((acc, match) => {
      const leagueId = match.league.id;
      if (!acc[leagueId]) {
        acc[leagueId] = []; // Initialize an array for this league
      }
      acc[leagueId].push(match);
      return acc;
    }, {} as Record<number, Match[]>); // Ensure TypeScript infers this correctly
  
    // Transform grouped matches into a format suitable for SectionList
    return Object.entries(groupedMatches).map(([leagueId, matches]) => ({
      title: matches[0].league.name, // Use the league name as the section title
      data: matches, // Matches for this league
    }));
  };
  
 
  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
      }}
      
    >
      
      <SafeAreaProvider>
      <SafeAreaView>
        <SectionList
          sections={matches.slice(0, 5)} // Display only the first 5 leagues
          keyExtractor={(item) => item.fixture.id.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <List.Section>
                <List.Subheader>{title}</List.Subheader>
            </List.Section>
          )}
          renderItem={({ item }) => (
                <Card>
                    <Card.Content>
                        <Text variant="titleMedium">
                        {item.teams.home.name} vs {item.teams.away.name}
                        </Text>
                        <Text variant="bodyLarge">
                        Score: {item.goals.home} - {item.goals.away}
                        </Text>
                    </Card.Content>
                </Card>
          )}
          ItemSeparatorComponent={() => <Divider />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
      
    </View>
  );
}
