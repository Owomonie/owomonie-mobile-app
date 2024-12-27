import { StyleSheet, Image, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideOutLeft,
  SlideInRight,
} from "react-native-reanimated";
import { onboardingSteps } from "./data";
import { useTheme } from "@/context/ThemeContext";
import { brandColor } from "@/constants/Colors";

type OnboardingGestureProps = {
  onContinue: () => void;
  onBack: () => void;
  screenIndex: number;
};

const OnboardingGestures = ({
  screenIndex,
  onBack,
  onContinue,
}: OnboardingGestureProps) => {
  const data = onboardingSteps[screenIndex];

  const { isDarkMode } = useTheme();

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().runOnJS(true).direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().runOnJS(true).direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <GestureDetector gesture={swipes}>
      <View style={styles.pageContent} key={screenIndex}>
        <View style={styles.imageWrapper}>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.imageContainer}
          >
            <Image source={data.image} style={styles.image} />
          </Animated.View>
        </View>
        <View style={styles.stepIndicatorContainer}>
          {onboardingSteps.map((step, index) => (
            <View
              key={index}
              style={[
                styles.stepIndicator,
                {
                  backgroundColor:
                    index === screenIndex ? brandColor : "#CECECE",
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Animated.Text
            entering={SlideInRight}
            exiting={SlideOutLeft}
            style={[
              styles.title,
              {
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            ]}
          >
            {data.title}
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.delay(50)}
            exiting={SlideOutLeft}
            style={[
              styles.description,
              {
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            ]}
          >
            {data.description}
          </Animated.Text>
        </View>
      </View>
    </GestureDetector>
  );
};

export default OnboardingGestures;

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    alignSelf: "center",
    objectFit: "scale-down",
  },
  footer: {
    flex: 0.7,
  },
  title: {
    fontSize: 48,
    lineHeight: 59,
    paddingHorizontal: 40,
    textTransform: "uppercase",
    marginTop: 20,
    textAlign: "center",
    fontFamily: "An700",
  },
  description: {
    fontSize: 16,
    lineHeight: 21,
    marginTop: 20,
    paddingHorizontal: 49,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "As500",
  },

  stepIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 20,
  },
  stepIndicator: {
    height: 6,
    width: 40,
    borderRadius: 5,
    borderWidth: 1,
  },
});
