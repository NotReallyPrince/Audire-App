import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import audire from "../../api/audire";
import { Music } from "../../context/MusicContext";

const AlbumPage = () => {
  const router = useRouter();

  const { play, setQueue, currentTrack } = useContext(Music)
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState(null);
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const getAlbumInfo = async () => {
    try {
      const data = await audire.getAlbumDetails(id);
      const recom = await audire.getAlbumRecommendations(id);
      setAlbum(data);
      setQueue(data.songs);
      setRecommendations(recom);
    } catch (error) {
      console.error("Error fetching album data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAlbumInfo();
    }
  }, [id]);

  const getArtist = (id) => {
    router.push(`/artist/${id}`);
  };
  const getAlbum = (id) => {
    router.push(`/album/${id}`);
  };
  const getTrack = (id) => {
    router.push(`/track/${id}`);
  };

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
    <SafeAreaView className="w-full h-full">
      <LinearGradient colors={["#040306", "#131624"]} className="w-full h-full">
        <ScrollView>
          <Pressable className="m-3" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <View className="flex items-center mb-3">
            <Image
              source={{ uri: album.image[2]?.link }}
              className="w-52 h-52 object-contain"
            />
            <View>
              <Text className="font-bold text-lg text-white m-2">
                {album.name}
              </Text>
            </View>
            <Text className="text-gray-400 text-[11px]">
              {album.copyright_text}
            </Text>
          </View>
          <Pressable>
            <View className="flex-row justify-center items-center gap-4">
              <Pressable  onPress={() => play(album?.songs[0])}>
                <Text className="bg-white text-black px-3 py-2 w-20 text-center rounded-full font-bold">Play</Text>
              </Pressable>
            </View>
          </Pressable>
          <View className="ml-2">
            <Text className="text-lg text-white font-bold m-1 ml-2 mb-2">
              Songs
            </Text>
            {album.songs?.map((song) => (
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
          <View className="m-2">
            <Text className="text-lg text-white font-bold m-1 ml-2">
              {album.modules.recommend.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              {recommendations.map((item, index) => {
                return (
                  <View className="justify-center m-1" key={index}>
                    <Pressable onPress={() => getAlbum(item.id)}>
                      <Image
                        className="w-[130px] h-[130px]"
                        source={{ uri: item.image[2]?.link }}
                      />
                      <Text
                        numberOfLines={1}
                        className="text-white font-bold m-2 w-[110px]"
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View className="m-2">
            <Text className="text-lg text-white font-bold m-1 ml-2">
              Artists
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              {album.artist_map.artists.map((item, index) => {
                return (
                  <View className="justify-center m-1" key={index}>
                    <Pressable onPress={() => getArtist(item.id)}>
                      <Image
                        className="w-[130px] h-[130px]"
                        source={{ uri: item.image[2]?.link }}
                      />
                      <Text
                        numberOfLines={1}
                        className="text-white font-bold m-2 w-[110px]"
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AlbumPage;