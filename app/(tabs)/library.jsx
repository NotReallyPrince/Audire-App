import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { Music } from "../../context/MusicContext";
import audire from "../../api/audire";
import { useRouter } from "expo-router";

const Library = () => {
  const [libdata, setLibdata] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { recentlyPlayed, play } = useContext(Music);

  const getHomePageData = async () => {
    try {
      const data = await audire.getHomeData();
      setLibdata(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getHomePageData();
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
    <SafeAreaView className="mb-10">
      <LinearGradient colors={["#040306", "#131624"]} className="w-full h-full">
      <ScrollView>
        <View className="flex-row justify-between items-center m-2">
          <View className="flex-row items-center h-10">
            <Text className="text-white text-2xl font-bold ml-1">Library</Text>
          </View>
        </View>
        <View className="w-full h-[1px] bg-gray-600" />
        {recentlyPlayed.length > 0 && (
          <View>
            <Text className="text-white font-bold text-xl mx-3 m-2">Recently Played</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recentlyPlayed.map((item, index) => (
                  <View className="m-2" key={item.id}>
                    <Pressable onPress={() => play(item)}>
                      <Image
                        className="w-[130px] h-[130px]"
                        source={{ uri: item.image[2]?.link || item.image[2]?.url }}
                      />
                      <Text
                        numberOfLines={2}
                        className="text-white text-[12px] font-bold m-2 w-[110px]"
                      >
                        {item.name || item.title}
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
          </View>
        )}
        {libdata.promo0 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-2">
              {libdata?.promo0?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo0?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo1 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo1?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo1?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo2 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo2?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo2?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo3 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo3?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo3?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo4 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo4?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo4?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo5 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo5?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo5?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo6 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo6?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo6?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo7 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo7?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo7?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo9 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo9?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo9?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo10 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo10?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo10?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo11 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo11?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo11?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo13 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo13?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo13?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        {libdata.promo14 && (
          <>
            <Text className="text-white text-xl font-bold mx-3 my-3">
              {libdata?.promo14?.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {libdata?.promo14?.data.map((item, index) => (
                <Pressable
                  className="m-2"
                  key={index}
                  onPress={() => getRedirect(item.type, item.id)}
                >
                  <Image
                    className="w-[130px] h-[130px]"
                    source={{ uri: item.image[2]?.link || item.image }}
                  />
                  <Text
                    numberOfLines={2}
                    className="text-white m-2 w-28"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Library;
