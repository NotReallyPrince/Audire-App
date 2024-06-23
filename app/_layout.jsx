import React, { useContext, useEffect } from "react";
import {  Stack, useRouter, useSegments } from "expo-router";
import { MusicContext } from "../context/MusicContext";

const RootLayout = () => {
  const router = useRouter();

  useEffect(() => {
   router.replace("(tabs)/home")
  }, [router])
  return (
      <MusicContext>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, statusBarColor: 'black' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarColor: 'black', animation: 'ios' }} />
          <Stack.Screen name="artist/[id]" options={{ headerShown: false,  statusBarColor: 'black', animation: 'ios' }} />
          <Stack.Screen name="album/[id]" options={{ headerShown: false, statusBarColor: 'black', animation: 'ios' }} />
          <Stack.Screen name="track/[id]" options={{ headerShown: false, statusBarColor: 'black', animation: 'ios' }} />
          <Stack.Screen name="playlist/[id]" options={{ headerShown: false, statusBarColor: 'black', animation: 'ios' }} />
          <Stack.Screen 
            name="player"
            options={{ 
              headerShown: false, 
              animation: "slide_from_bottom",
              animationDuration: 400,
              statusBarColor: 'black'
            }} 
          />
        <Stack.Screen name="lyrics/[id]" options={{ headerShown: false, statusBarColor: 'black', animation: 'slide_from_bottom'}} />
        <Stack.Screen name="queue" options={{ headerShown: false, statusBarColor: 'black', animation: "slide_from_right" }} />
        </Stack>
      </MusicContext>
  );
};

export default RootLayout;
