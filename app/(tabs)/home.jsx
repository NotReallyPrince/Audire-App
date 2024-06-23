import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import audire from "../../api/audire";
import { Music } from "../../context/MusicContext";

const Home = () => {
  const { currentTrack } = useContext(Music);

  const [albums, setAlbums] = useState([]);
  const [homeData, setHomeData] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const greetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const message = greetingMessage();

  const getHomePageData = async () => {
    try {
      const data = await audire.getHomeData();
      const albdata = await audire.getAlbumData();
      setAlbums(albdata.trending.albums);
      setHomeData(data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    getHomePageData();
  }, []);

  const getArtist = (id) => {
    router.push(`/artist/${id}`);
  };
  const getAlbum = (id) => {
    router.push(`/album/${id}`);
  };
  const getPlaylist = (id) => {
    router.push(`/playlist/${id}`);
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
    <SafeAreaView className="mb-[39px]">
      <LinearGradient colors={["#040306", "#131624"]}>
        <ScrollView>
          <View className="flex-row mx-2 items-center my-2">
            <Image
              source={{
                uri: "https://graph.org/file/8f8b9cb758871dc3cfdab.jpg",
              }}
              className="w-12 h-12 rounded-full mr-2"
            />
            <View className="flex-col">
              <View>
                <Text className="text-white text-lg font-bold">
                  Audire Music
                </Text>
                <Text className="text-gray-300 text-sm">{message}</Text>
              </View>
            </View>
          </View>
          <View className="w-full h-[1px] bg-gray-600" />
          <Text className=" text-xl font-bold mx-3 my-2 drop-shadow-md bg-gradient-to-br from-neutral-200 to-neutral-600 bg-clip-text text-transparent text-white">
          {homeData?.albums?.title}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            {albums.map((item, index) => {
              return (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getAlbum(item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <Text className="text-white text-xl font-bold mx-3 my-2">
          {homeData?.playlists?.title}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            {homeData?.playlists?.data.map((item, index) => {
              return (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getPlaylist(item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <Text className="text-white text-xl font-bold mx-3 my-2">
          {homeData?.charts?.title}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            {homeData?.charts?.data.map((item, index) => {
              return (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getPlaylist(item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <Text className="text-white text-xl font-bold mx-3 my-2">
          {homeData?.artist_recos?.title}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            {homeData?.artist_recos?.data?.map((item, index) => {
              return (
                <View className="m-2" key={index}>
                  <Pressable onPress={() => getArtist(item.id)}>
                    <Image
                      className="w-[130px] h-[130px]"
                      source={{ uri: item.image[2]?.link }}
                    />
                    <Text
                      numberOfLines={2}
                      className="text-white m-2 w-28"
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
