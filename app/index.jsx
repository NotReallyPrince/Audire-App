import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'

const index = () => {
  return (
    <View className="w-full h-full bg-black">
      <Image
        source={{ uri: "https://graph.org/file/b8c639eaca6866ad92f8e.png" }}
        className="w-full h-80"
      />
      <Text className="text-white font-bold text-[36px] text-center mt-10">
        Millions of Songs Free on Audire!
      </Text>
    </View>
  )
}

export default index