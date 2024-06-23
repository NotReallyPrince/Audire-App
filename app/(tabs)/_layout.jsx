import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Music } from "../../context/MusicContext";
import BottomPlayer from "../../components/player";

const TabLayout = () => {
  const { currentTrack } = useContext(Music);
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarBackground: () => {
            <BlurView
              intensity={95}
              style={{
                ...StyleSheet.absoluteFillObject,
                position: "absolute",
                height: 55,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
              }}
            />;
          },
          tabBarStyle: {
            height: 55,
            borderTopWidth: 0,
            position: 'absolute',
            backgroundColor: "#181818",
            borderTopLeftRadius: 23,
            borderTopRightRadius: 20,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="home" size={24} color="white" />
              ) : (
                <FontAwesome name="home" size={24} color="gray" />
              ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarLabel: "Search",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="search" size={24} color="white" />
              ) : (
                <FontAwesome name="search" size={24} color="gray" />
              ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "library",
            tabBarLabel: "library",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="library-music" size={24} color="white" />
              ) : (
                <MaterialIcons name="library-music" size={24} color="gray" />
              ),
          }}
        />
      </Tabs>
      {currentTrack && <BottomPlayer />}
    </>
  );
};

export default TabLayout;
