/* eslint-disable react-native/no-inline-styles */
import { MoveRight } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { onboardingInfo } from "../../assets/data/data";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const navigation = useNavigation();

  const handleNext = () => {
    if (activeIndex < onboardingInfo.length - 1) {
      flatListRef?.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to next screen
      console.log("Navigate to main app");
    }
  };

  const handleLogin = () => {
    // console.log("Login pressed");
    navigation.navigate("Login");
  };

  const handleSignUp = () => {
    // console.log("Sign up pressed");
    navigation.navigate("BottomNavigator");
  };

//   const handleGetStarted = () => {
//     console.log("Get started pressed");
//   };

  const renderOnboardingItem = ({ item, index }) => {
    return (
      <View style={styles.slideContainer}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          {/* {item.isAI && (
            <View style={styles.aiOverlay}>
              <View style={styles.aiElements}>
               
                <View style={styles.networkNode} />
                <View style={[styles.networkNode, { top: 60, left: 80 }]} />
                <View style={[styles.networkNode, { top: 120, right: 60 }]} />
                <Text style={styles.aiLabel}>AI</Text>
              </View>
            </View>
          )} */}
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Dot Indicator */}
          <View style={styles.dotContainer}>
            {onboardingInfo.map((_, dotIndex) => (
              <View
                key={dotIndex}
                style={[
                  styles.dot,
                  activeIndex === dotIndex
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          {/* Title and Subtitle */}
          <View style={styles.textContainer}>
            <Text className="font-Bold text-4xl text-center px-10">
              {item.title}
            </Text>
            <Text className="font-Regular text-center ">{item.subtitle}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {item.showLoginButtons ? (
              <View className="flex-row justify-between items-center">
                <Pressable
                  className="bg-surfaceAction py-4 rounded-xl flex-row items-center justify-center "
                  style={{
                    width: responsiveWidth(43),
                  }}
                  onPress={handleLogin}
                  android_ripple={{ color: "rgba(255,255,255,0.1)" }}
                >
                  <Text className="text-textPrimaryInverted font-SemiBold text-[16px]">
                    Login
                  </Text>
                </Pressable>
                <Pressable
                  className="bg-surfaceSecondary py-4 rounded-xl flex-row items-center justify-center  "
                  style={{
                    width: responsiveWidth(43),
                  }}
                  onPress={handleSignUp}
                  android_ripple={{ color: "rgba(109,40,217,0.1)" }}
                >
                  <Text className="text-textAction font-SemiBold text-[16px]">
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            ) : item.isFinal ? (
              <Pressable
                className="bg-surfaceAction py-4 rounded-xl flex-row items-center justify-center gap-2"
                onPress={handleNext}
                android_ripple={{ color: "rgba(255,255,255,0.1)" }}
              >
                <Text className="text-textPrimaryInverted font-SemiBold text-[16px]">
                  Get Started
                </Text>
                {/* <Text style={styles.arrow}>→</Text> */}
                <MoveRight size={20} color="red" />
              </Pressable>
            ) : (
              <Pressable
                className="bg-surfaceAction py-4 rounded-xl flex-row items-center justify-center gap-2"
                onPress={handleNext}
                android_ripple={{ color: "rgba(255,255,255,0.1)" }}
              >
                <Text className="text-textPrimaryInverted font-SemiBold text-[16px]">
                  Next
                </Text>
                <MoveRight size={20} color="white" />
              </Pressable>
            )}
          </View>

          {/* Footer */}
          <View
            className="flex-1  justify-center items-center "
            style={{
              position: "absolute",
              bottom: 3,
              left: responsiveWidth(5),
              right: responsiveWidth(5),
            }}
          >
            <Text className="font-Regular  mb-1 text-center">@2025 Rai</Text>
          </View>
          
        </View>
      </View>
    );
  };

  return (

      <FlatList
        ref={flatListRef}
        data={onboardingInfo}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOnboardingItem}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slideContainer: {
    width: width,
    height: height,
    flex: 1,
  },
  imageContainer: {
    height: height * 0.5,
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  aiOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  aiElements: {
    flex: 1,
    position: "relative",
  },
  networkNode: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6D28D9",
    top: 40,
    left: 40,
  },
  aiLabel: {
    position: "absolute",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    top: 100,
    left: 50,
    backgroundColor: "rgba(109,40,217,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  contentContainer: {
    // flex: 1,
    // backgroundColor: "white",
    // paddingHorizontal: responsiveWidth(5),
    // // justifyContent: "space-between",
    // paddingTop: responsiveHeight(3),
    // borderTopLeftRadius: responsiveWidth(5),
    // borderTopRightRadius: responsiveWidth(5),
    // // top: -20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: responsiveHeight(55),
    // height: height * 0.60,
    backgroundColor: "white",
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(3),
    gap: responsiveHeight(3),
    // justifyContent: "space-between",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 32,
    backgroundColor: "#8E54FE",
  },
  inactiveDot: {
    width: 10,
    backgroundColor: "#B28AFF",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: responsiveHeight(3),
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    // marginBottom: 16,
    // lineHeight: 34,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#6B7280",
    // lineHeight: 24,
    // paddingHorizontal: 10,
  },
  buttonContainer: {
    // marginVertical: responsiveHeight(3),
    position: "absolute",
    top: responsiveHeight(30), // Adjust spacing from bottom
    left: responsiveWidth(5),
    right: responsiveWidth(5),
  },
  loginButtonsContainer: {
    gap: 12,
  },
  loginButton: {
    backgroundColor: "#6D28D9",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  signUpButtonText: {
    color: "#6D28D9",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#6D28D9",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  getStartedButton: {
    backgroundColor: "#5700FE",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  getStartedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  arrow: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    // color: "#9CA3AF",
    // fontSize: 14,
  },
});