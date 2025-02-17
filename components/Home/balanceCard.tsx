import { useLayoutEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import { useTheme } from "@/context/ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type HomeBalanceType = {
  children: React.ReactNode;
  activeTitle: string;
};

const HomeBalanceCard = ({ children, activeTitle }: HomeBalanceType) => {
  const { isDarkMode } = useTheme();

  const [skeletalLoading, setSkeletalLoading] = useState<boolean>(true);
  const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";

  const loading = useSelector((state: RootState) => state.banks.loading);

  useLayoutEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setSkeletalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: activeTitle === "individual" ? 7 : 20,
      }}
    >
      <Skeleton
        show={loading || skeletalLoading}
        radius={"square"}
        colorMode={colorMode}
      >
        <View
          style={[
            styles.card,
            {
              width: activeTitle === "individual" ? 280 : undefined,
              height: activeTitle === "individual" ? 180 : 160,
              borderColor: isDarkMode ? "grey" : "white",
            },
          ]}
        >
          {/* SVG Background Effect */}
          <Svg
            width="112"
            height="75"
            viewBox="0 0 112 75"
            fill="none"
            style={styles.svgBackground1}
          >
            <Path
              d="M0.881034 -28.2474L27.5965 -74.52C39.9646 -71.3478 51.9129 -66.4543 63.1683 -59.956C81.2728 -49.5034 96.4584 -35.5539 108.308 -18.5062L109.219 -17.1891L110.815 -17.0589C131.503 -15.3207 151.175 -9.14536 169.287 1.31151C180.542 7.80979 190.749 15.7074 199.666 24.8145L172.95 71.0872C165.381 60.2823 155.713 51.4432 144.186 44.788C141.967 43.5071 139.648 42.2945 137.287 41.1887L131.717 38.5672L132.479 44.6674C133.614 53.7912 133.859 63.054 133.197 72.189L133.061 74.067L82.4928 74.0219L82.7451 71.7646C83.9713 60.6449 83.0518 48.9902 80.0791 38.0772L79.1926 34.8178L75.9266 35.6797C64.9733 38.5768 54.4185 43.6068 45.4131 50.2256L43.5907 51.5618L42.708 50.0739L18.2514 7.80574L19.81 6.74931C27.3913 1.60692 35.5395 -2.81499 44.0268 -6.40029L49.6907 -8.79045L44.6353 -12.3039C42.4989 -13.7946 40.2875 -15.1976 38.0707 -16.4774C26.5271 -23.1421 14.0278 -27.094 0.885736 -28.2471L0.881034 -28.2474Z"
              fill="#EBF73E"
            />
          </Svg>

          <Svg
            width="120"
            height="77"
            viewBox="0 0 112 80"
            fill="none"
            style={styles.svgBackground2}
          >
            <Path
              d="M-87.119 46.7526L-60.4035 0.479974C-48.0354 3.65219 -36.0871 8.5457 -24.8317 15.044C-6.72721 25.4966 8.45836 39.4461 20.308 56.4938L21.2188 57.8109L22.8148 57.9411C43.5034 59.6793 63.1749 65.8546 81.2867 76.3115C92.5421 82.8098 102.749 90.7074 111.666 99.8145L84.9503 146.087C77.3807 135.282 67.7128 126.443 56.1856 119.788C53.967 118.507 51.6481 117.295 49.2871 116.189L43.7166 113.567L44.4786 119.667C45.6138 128.791 45.8586 138.054 45.1969 147.189L45.0613 149.067L-5.50723 149.022L-5.25491 146.765C-4.02867 135.645 -4.94815 123.99 -7.92089 113.077L-8.80743 109.818L-12.0734 110.68C-23.0267 113.577 -33.5815 118.607 -42.5869 125.226L-44.4093 126.562L-45.292 125.074L-69.7486 82.8057L-68.19 81.7493C-60.6087 76.6069 -52.4605 72.185 -43.9732 68.5997L-38.3093 66.2095L-43.3647 62.6961C-45.5011 61.2054 -47.7125 59.8024 -49.9293 58.5226C-61.4729 51.8579 -73.9722 47.906 -87.1143 46.7529L-87.119 46.7526Z"
              fill="#EBF73E"
            />
          </Svg>
          {children}
        </View>
      </Skeleton>
    </View>
  );
};

export default HomeBalanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  svgBackground1: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  svgBackground2: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
