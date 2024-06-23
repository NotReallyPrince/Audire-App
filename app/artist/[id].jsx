import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Music } from "../../context/MusicContext";
import audire from "../../api/audire";
import { Ionicons } from "@expo/vector-icons";

const ArtistPage = () => {
  const router = useRouter();
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const { play, setQueue, currentTrack } = useContext(Music);

  const navigation = useNavigation();

  const getArtistInfo = async () => {
    try {
      const data = await audire.getArtistDetails(id);
      setArtist(data);
      setQueue(data.top_songs);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getArtistInfo();
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

  if (!artist) {
    return (
      <SafeAreaView className="bg-gray-700 w-full h-full flex justify-center items-center">
        <Text className="text-white">Artist not found</Text>
      </SafeAreaView>
    );
  }

  const getAlbum = (id) => {
    router.push(`/album/${id}`);
  };

  const getTrack = (id) => {
    router.push(`/track/${id}`);
  };

  return (
    <SafeAreaView className="w-full h-full">
      <LinearGradient colors={["#040306", "#131624"]} className="w-full h-full">
        <ScrollView>
          <Pressable className="ml-2 mt-3" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <View className="flex ml-5 justify-center items-center">
            <Image
              source={{ uri: artist.image[2].link }}
              className="w-52 h-52 object-contain"
            />
            <View className="mt-2">
              <Text className="font-bold text-white text-lg text-center">
                {artist.name}
              </Text>
              <Text className="text-gray-400 text-[11px] text-center">
                {artist.subtitle}
              </Text>
            </View>
            <Pressable className="mt-2">
              <View className="flex-row justify-center items-center gap-4">
                <TouchableOpacity onPress={() => play(artist?.top_songs[0])}>
                  <Text className="bg-white text-black px-3 py-2 w-20 text-center rounded-full font-bold">
                    Play
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
          <View className="m-2">
            <Text className="text-lg text-white font-bold m-1 ml-2 mb-2">
              Top Songs
            </Text>
            <ScrollView>
              {artist.top_songs.map((song) => (
                <Pressable
                  className="flex-row items-center py-2 px-2"
                  key={song.id}
                  onPress={() => play(song)}
                >
                  <Image
                    source={{ uri: song.image[1].link }}
                    className="w-12 h-12 rounded-sm"
                    alt={song.name}
                  />
                  {currentTrack?.id == song.id ? (
                  <View>
                    <Text className="text-green-400 px-3 font-bold w-[75vw]">
                      {song?.name || song.title}
                    </Text>
                    <Text className="text-gray-400 px-3">
                      {song.artist_map.artists[0].name}
                    </Text>
                  </View>
                  ) : (
                     <View>
                     <Text className="text-white px-3 font-bold w-[75vw]">
                       {song?.name || song.title}
                     </Text>
                     <Text className="text-gray-400 px-3">
                       {song.artist_map.artists[0].name}
                     </Text>
                   </View>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View className="m-2">
            <Text className="text-lg text-white font-bold m-1 ml-2">
              Top Albums
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              {artist.top_albums.map((item, index) => {
                return (
                  <View className="justify-center m-1" key={index}>
                    <Pressable onPress={() => getAlbum(item.id)}>
                      <Image
                        className="w-[150px] h-[150px]"
                        source={{ uri: item.image[2].link }}
                      />
                      <Text
                        numberOfLines={1}
                        className="text-white font-bold m-2 w-[135px]"
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
              Dedicated artist Playlist
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              {artist.dedicated_artist_playlist.map((item, index) => {
                return (
                  <View className="justify-center m-1" key={index}>
                    <Pressable onPress={() => getAlbum(item.id)}>
                      <Image
                        className="w-[130px] h-[130px]"
                        source={{ uri: item.image }}
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
              Featured Artist Playlist
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              {artist.featured_artist_playlist.map((item, index) => {
                return (
                  <View className="justify-center m-1" key={index}>
                    <Pressable onPress={() => getAlbum(item.id)}>
                      <Image
                        className="w-[130px] h-[130px]"
                        source={{ uri: item.image }}
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

export default ArtistPage;
