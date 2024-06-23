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
import { Ionicons } from "@expo/vector-icons";

const TrackPage = () => {
  const router = useRouter();

  const { play, setQueue } = useContext(Music);

  const [track, setTrack] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useLocalSearchParams();

  const GetTrackInfo = async () => {
    try {
      const data = await audire.getSongDetails(id);
      const recom = await audire.getSongRecommendations(id);
      setTrack(data);
      setRecommend(recom);
      setQueue(recom);
    } catch (error) {
      console.error("Error fetching track data:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  const getArtist = (id) => {
    router.push(`/artist/${id}`);
  };

  const getTrack = (id) => {
    router.push(`/track/${id}`);
  };

  useEffect(() => {
    if (id) {
      GetTrackInfo();
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

  const artists = track?.songs?.[0]?.artist_map?.artists || [];

  return (
    <SafeAreaView>
      <LinearGradient colors={["#040306", "#131624"]} className="w-full h-full">
        <ScrollView>
          <Pressable className="ml-2 mt-3" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <View className="flex mt-4 justify-center items-center">
            <Image
              source={{ uri: track?.songs?.[0]?.image?.[2]?.link }}
              className="w-52 h-52 object-contain"
            />
            <View className="mt-2">
              <Text className="font-bold text-white text-lg text-center">
                {track.songs[0].name}
              </Text>
              <Text className="text-gray-400 text-[11px] text-center">
                {track.songs[0].subtitle}
              </Text>
            </View>
            <View className="flex-row justify-center items-center gap-4 my-[1px]">
              <Pressable
                onPress={() => play(track?.songs[0])}
              >
                <Text className="bg-white text-black px-3 py-2 w-20 text-center rounded-full font-bold">
                  Play
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="m-2">
            <Text className="text-lg text-white font-bold m-1 ml-2">
              {track.modules.recommend.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommend.map((item, index) => (
                <View className="justify-center m-1" key={index}>
                  <Pressable onPress={() => getTrack(item.id)}>
                    <Image
                      className="w-[150px] h-[150px]"
                      source={{ uri: item?.image[2]?.link }}
                    />
                    <Text
                      numberOfLines={1}
                      className="text-white font-bold m-2 w-[135px]"
                    >
                      {item?.name}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
          <View className="ml-2">
            <Text className="text-lg text-white font-bold m-1 ml-2">
              Artists
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists.map((item, index) => (
                <View className="justify-center m-1" key={index}>
                  <Pressable onPress={() => getArtist(item?.id)}>
                    <Image
                      className="w-[130px] h-[130px]"
                      source={{ uri: item?.image[2]?.link }}
                    />
                    <Text
                      numberOfLines={1}
                      className="text-white font-bold m-2 w-[110px]"
                    >
                      {item?.name}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TrackPage;
