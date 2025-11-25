import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useDimensions = (ctx: "window" | "screen") => {
  const [dimensions, setDimensions] = useState(() => {
    const { height, width } = Dimensions.get(ctx);
    return { height, width };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ height: window.height, width: window.width });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
};
