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
import { IVideoResponse } from "@/interfaces/videos/videoResponse";
import { Video,ResizeMode } from 'expo-av';

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [video, setVideo] = useState<IVideoResponse>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const getVideo = (id: string) => {
    setLoading(true)
    fetch(`https://sos-backend-lheb.onrender.com/api/videos/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setVideo(data.body);
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
      getVideo(id as string);
    }
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:(video && video.title) ? video.title :"",
      headerTransparent: false,
      headerTitleStyle:{marginHorizontal:10,color:"white"},
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
          <Ionicons name="arrow-back-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      ),
    });
  }, [video]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white}/>
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
       {video && video.video_url &&
       <Video
        style={styles.image}
        source={{uri: video?.video_url}}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{video?.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.description}>{video?.description}</Text>
          {/* {listing && listing.content && <RenderHtml
            contentWidth={width} // Adjust according to your layout
            source={{ html: listing.content }}
            baseStyle={styles.description}
          />} */}
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
  video: {
    flex: 1,
    alignSelf: 'stretch'
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
    alignItems: "center",
    justifyContent: "center",
    color: Colors.white,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: Colors.bgColor,
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
    color: Colors.white,
  },
});

export default DetailsPage;
