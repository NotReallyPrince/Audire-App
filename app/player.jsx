import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import { Music } from "../context/MusicContext";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PlayerLayout = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    totalDuration,
    playPreviousTrack,
    playNextTrack,
    handlePlayPause,
    seek,
    repeat,
    setRepeat,
    queue
  } = useContext(Music);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onSeek = (value) => {
    const newPosition = (value / 100) * totalDuration;
    seek(newPosition);
  };

  const router = useRouter();

  const getQueue = () => {
    router.push("/queue");
  };
  const getLyrics = (id) => {
    router.push(`/lyrics/${id}`);
  };

  return (
    <SafeAreaView>
      <LinearGradient colors={["#040306", "#131624"]} className="w-full h-full">
        <View className="w-full h-full mt-7">
          <View className="flex-row justify-center items-center">
            <View
              className="w-20 h-2 bg-gray-700 rounded-full"
              accessible={false}
            />
          </View>
          <View className="h-12" />
          <View className="m-3 flex-col justify-center items-center">
            <Image
              className="w-[300px] h-[300px] rounded-lg m-2"
              source={{
                uri: currentTrack?.image[2].url || currentTrack?.image[2].link,
              }}
            />
            <View className="flex m-2">
              <View>
                <Text
                  numberOfLines={1}
                  className="text-white font-bold text-2xl text-center"
                >
                  {currentTrack?.name}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-[#03D3D3] font-bold text-[12px] mt-1 text-center w-68"
                >
                  {currentTrack?.subtitle ||
                    currentTrack?.artist_map?.artists[0].name}
                </Text>
              </View>
            </View>
          </View>
          <View className="mx-4 seekbar">
            <Slider
              style={{ width: "100%", height: 30 }}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="gray"
              thumbTintColor="#FFFFFF"
              value={progress * 100}
              onSlidingComplete={onSeek}
            />
          </View>
          <View className="mx-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-[#D3D3D3] text-[15px]">
                {formatTime(currentTime)}
              </Text>
              <Text className="text-[#D3D3D3] text-[15px]">
                {formatTime(totalDuration)}
              </Text>
            </View>
          </View>
          <View className="p-3 flex-row items-center justify-center space-x-8 mt-5">
            <TouchableOpacity onPress={playPreviousTrack}>
              <AntDesign name="banckward" size={38} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              {isPlaying ? (
                <Fontisto name="pause" size={60} color="white" />
              ) : (
                <FontAwesome name="play" size={60} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={playNextTrack}>
              <AntDesign name="forward" size={38} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-center space-x-16 mt-8">
            {currentTrack?.has_lyrics && (
              <TouchableOpacity onPress={() => getLyrics(currentTrack.id)}>
                <MaterialIcons name="lyrics" size={26} color="white" />
              </TouchableOpacity>
            )}
            {queue.length > 1 && (       
            <TouchableOpacity onPress={() => getQueue()}>
              <MaterialIcons name="queue-music" size={32} color="white" />
            </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setRepeat(!repeat)}>
              {repeat ? (
                <MaterialIcons name="repeat-one" size={24} color="white" />
              ) : (
                <MaterialIcons name="repeat" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PlayerLayout;
