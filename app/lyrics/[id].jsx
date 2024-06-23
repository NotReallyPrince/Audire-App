import {
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
    ActivityIndicator,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Music } from "../../context/MusicContext";
  import { AntDesign } from "@expo/vector-icons";
  import { LinearGradient } from "expo-linear-gradient";
  import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
  import audire from "../../api/audire";

  
  const TrackPage = () => {
    const router = useRouter();
  
    const [lyrics, setLyrics] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const { id } = useLocalSearchParams();
  
    const GetLyrics = async () => {
      try {
        const data = await audire.SearchLyrics(id);
        const formattedLyrics = data.lyrics.replace(/<br\s*\/?>/gi, "\n");
        setLyrics(formattedLyrics);
      } catch (error) {
        console.error("Error fetching track data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const navigation = useNavigation();
  
    useEffect(() => {
      if (id) {
        GetLyrics();
      }
    }, [id]);
  
    if (loading) {
      return (
        <SafeAreaView className="flex-1">
          <LinearGradient
            colors={["#040306", "#131624"]}
            className="flex-1 justify-center items-center"
          >
            <View className="items-center">
              <ActivityIndicator size="large" color="#ffffff" />
              <Text className="mt-[20px] text-white text-[16px] font-bold">
                Loading...
              </Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      );
    }
  
    return (
      <SafeAreaView>
        <LinearGradient colors={["#040306", "#131624"]} className="w-full h-full">
          <ScrollView>
            <View>
                <Text className="text-white font-bold text-xl text-center mt-2 border border-gray-700 border-t-0 py-2">Lyrics</Text>
                <Text className="text-white text-center my-10 text-lg font-medium">
                    {lyrics}
                </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  };
  
  export default TrackPage;
  