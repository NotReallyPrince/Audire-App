import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { Music } from "../context/MusicContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const QueuePage = () => {
  const { queue, play, currentTrack } = useContext(Music);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#040306", "#131624"]}
        className="flex-1 justify-center items-center"
      >
        <ScrollView>
          <View className="ml-2">
            <View className="flex-row items-center">
            <Pressable className="m-3" onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text className="text-xl text-white font-bold my-4 ml-2">
              Queue Songs
            </Text>
            </View>
            {queue?.map((song) => (
              <Pressable
                className="flex-row items-center py-2 px-2"
                key={song.id}
                onPress={() => play(song)}
              >
                <Image
                  source={{ uri: song.image[1]?.link }}
                  className="w-12 h-12 rounded-sm"
                  alt={song.name}
                />
                {currentTrack?.id == song.id ? (
                  <View>
                    <Text className="text-green-400 px-3 font-bold w-[75vw]">
                      {song.name}
                    </Text>
                    <Text className="text-gray-400 px-3">
                      {song.artist_map.artists[0].name}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text className="text-white px-3 font-bold w-[75vw]">
                      {song.name}
                    </Text>
                    <Text className="text-gray-400 px-3">
                      {song.artist_map.artists[0].name}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default QueuePage;
