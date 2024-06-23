import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { Music } from "../../context/MusicContext";
import { SafeAreaView } from "react-native-safe-area-context";
import audire from "../../api/audire";
import { useRouter } from "expo-router";

const search = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [topSearch, setTopSearch] = useState(null);

  const searchSongs = async (query) => {
    const response = await audire.searchSongs(query);
    const data = response;
    setSearchResults(data); 
  };

  const topSearchResults = async () => {
    const topdata = await audire.getTopSearch();
    setTopSearch(topdata);
    console.log(topSearch);
  };

  useEffect(() => {
    topSearchResults();
  }, []);

  const getRedirect = (type, id) => {
    if (type === "song") {
      return router.push(`/track/${id}`);
    } else if (type === "album") {
      return router.push(`/album/${id}`);
    } else if (type === "artist") {
      return router.push(`/artist/${id}`);
    } else if (type === "playlist") {
      return router.push(`/playlist/${id}`);
    }
  };

  const getAlbum = (id) => {
    router.push(`/album/${id}`);
  };

  const getTrack = (id) => {
    router.push(`/track/${id}`);
  };

  if (searchResults === null) {
    return (
      <SafeAreaView className="mb-[42px]">
        <LinearGradient
          colors={["#040306", "#131624"]}
          className="w-full h-full"
        >
          <ScrollView>
            <View>
              <Pressable className="flex-row justify-between items-center px-5 bg-[#181818] border border-gray-700 m-3 rounded-lg mt-3">
                <TextInput
                  value={input}
                  onChangeText={(text) => {
                    setInput(text);
                  }}
                  placeholder="Type to Search Song"
                  placeholderTextColor={"white"}
                  className="py-3 text-base text-white"
                />
                <FontAwesome
                  name="search"
                  size={24}
                  color="white"
                  onPress={() => searchSongs(input)}
                />
              </Pressable>
            </View>
            <View className="m-3">
              <Text className="text-white font-bold text-xl">Top Search</Text>
            </View>
            <View>
              {topSearch?.map((song) => (
                <Pressable
                  className="flex-row items-center px-5 py-2"
                  key={song.id}
                  onPress={() => getRedirect(song.type, song.id)}
                >
                  <Image
                    source={{ uri: song?.image[1]?.link || song.image }}
                    className="w-12 h-12 rounded-sm"
                    alt={song?.title}
                  />
                  <View>
                    <Text className="text-white px-3 font-bold w-[75vw]">
                      {song?.name || song.title}
                    </Text>
                    <Text className="text-gray-400 px-3">{song?.subtitle}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={["#040306", "#131624"]}
          className="w-full h-full"
        >
          <ScrollView>
            <View>
              <View className="flex-row justify-between items-center px-5 bg-[#181818] border border-gray-700 m-3 rounded-lg">
                <TextInput
                  value={input}
                  onChangeText={(text) => {
                    setInput(text);
                  }}
                  placeholder="Type to Search Song"
                  placeholderTextColor={"white"}
                  className="py-3 text-base text-white"
                />
                <TouchableOpacity>
                  <FontAwesome
                    name="search"
                    size={24}
                    color="white"
                    onPress={() => searchSongs(input)}
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-xl px-5">
                  Top Result
                </Text>
              </View>
              <View>
                {searchResults?.topQuery?.results?.map((song) => (
                  <Pressable
                    className="flex-row items-center px-5 py-2"
                    key={song.id}
                    onPress={() => getRedirect(song.type, song.id)}
                  >
                    <Image
                      source={{ uri: song.image[1].url }}
                      className="w-12 h-12 rounded-sm"
                      alt={song?.title}
                    />
                    <View>
                      <Text className="text-white px-3 font-bold w-[75vw]">
                        {song?.name || song.title}
                      </Text>
                      <Text className="text-gray-400 px-3">{song.type}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
              <View>
                <Text className="text-white font-bold text-xl px-5 mt-2">
                  Songs
                </Text>
              </View>
              <View>
                {searchResults?.songs?.results?.map((song) => (
                  <Pressable
                    className="flex-row items-center px-5 py-2"
                    key={song.id}
                    onPress={() => getTrack(song.id)}
                  >
                    <Image
                      source={{ uri: song.image[1].url }}
                      className="w-12 h-12 rounded-sm"
                      alt={song?.title}
                    />
                    <View>
                      <Text className="text-white px-3 font-bold w-[75vw]">
                        {song?.name || song.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="text-gray-400 px-3 text-[12px] w-[85vw]"
                      >
                        {song.primaryArtists}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
              <View>
                <Text className="text-white font-bold text-xl px-5 mt-2">
                  Albums
                </Text>
              </View>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator>
                  {searchResults?.albums?.results.map((item, index) => {
                    return (
                      <Pressable
                        className="justify-center ml-3 my-2"
                        key={index}
                        onPress={() => getAlbum(item.id)}
                      >
                        <Image
                          className="w-[130px] h-[130px] rounded-lg"
                          source={{ uri: item.image[2]?.url }}
                        />
                        <Text
                          numberOfLines={1}
                          className="text-white font-bold m-2 w-28"
                        >
                          {item.title}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default search;
