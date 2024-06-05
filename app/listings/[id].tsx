import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { IBlogListResponse } from "@/interfaces/blog/blogResponse";
import RenderHtml from "react-native-render-html";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [listing, setListing] = useState<IBlogListResponse>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const { width } = useWindowDimensions();

  const getAllBlogs = (id: string) => {
    setLoading(true)
    fetch(`https://sos-backend-00wx.onrender.com/api/blogs/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setListing(data.body);
        console.log(data.body);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error);
        setLoading(false)
      })
  };
  useEffect(() => {
    if (id) {
      getAllBlogs(id as string);
    }
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: false,

      headerBackground: () => (
        <View
          style={[ styles.header]}
        ></View>
      ),

      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  // const scrollOffset = useScrollViewOffset(scrollRef);

  // const imageAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: interpolate(
  //           scrollOffset.value,
  //           [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
  //           [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
  //         ),
  //       },
  //       {
  //         scale: interpolate(
  //           scrollOffset.value,
  //           [-IMG_HEIGHT, 0, IMG_HEIGHT],
  //           [2, 1, 1]
  //         ),
  //       },
  //     ],
  //   };
  // });

  // const headerAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
  //   };
  // }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        // ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Image
          source={{ uri: listing?.thumbnail_url }}
          style={[styles.image]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing?.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing?.description}</Text>
          {listing && listing.content && <RenderHtml
            contentWidth={width} // Adjust according to your layout
            source={{ html: listing.content }}
            baseStyle={styles.description}
          />}
          {/* <Text style={styles.description}>{listing?.content}</Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.white,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.white,
    marginVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor:Colors.bgColor
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
    color: Colors.white,
  },
});

export default DetailsPage;
