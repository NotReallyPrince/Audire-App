import { View, Text, Pressable, Image } from "react-native";
import React, { useContext } from "react";

import Entypo from "@expo/vector-icons/Entypo";
import { Music } from "../context/MusicContext";
import { Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import he from 'he'

const BottomPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    handlePlayPause,
  } = useContext(Music);

  router = useRouter()

  const onPress = () => {
    router.navigate("/player");
  };

  return (
    <View className="bg-black mx-3 my-2 rounded-lg absolute bottom-[53px]">
      <Pressable
        onPress={onPress}
        className="w-full p-3 flex-row justify-between items-center"
      >
        <View className="flex-row items-center justify-center gap-2">
          <Image
            className="w-10 h-10"
            source={{ uri: currentTrack?.image[1].url || currentTrack?.image[1].link }}
          />
          <Text className="text-[12px] font-bold w-48 text-white">
            {he.decode(currentTrack?.name)}
          </Text>
        </View>
        <View className="flex-row mr-2">
          <Pressable onPress={handlePlayPause}>
            {isPlaying ? (
              <Fontisto name="pause" size={24} color="white" />
            ) : (
              <Pressable onPress={handlePlayPause}>
                <Entypo name="controller-play" size={30} color="white" />
              </Pressable>
            )}
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default BottomPlayer;