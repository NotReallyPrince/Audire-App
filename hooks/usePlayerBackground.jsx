import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";

export const usePlayerBackground = (imgurl) => {
  const [imageColors, setImageColors] = useState();

  useEffect(() => {
    getColors(imgurl, {
      fallback: "#000",
      cache: true,
      key: imgurl,
    }).then((colors) => setImageColors(colors))
      .catch(error => console.error("Error fetching image colors:", error));
  }, [imgurl]);

  return { imageColors };
};
