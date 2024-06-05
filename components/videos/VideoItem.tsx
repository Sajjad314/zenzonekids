import Colors from "@/constants/Colors";
import { IVideoResponse } from "@/interfaces/videos/videoResponse";
import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export const VideoItem = ({
  videoResponse: item,
}: {
  videoResponse: IVideoResponse;
}) => (
  <Link href={`/videoListing/${item.id}`} asChild>
    <TouchableOpacity>
      <Animated.View
        style={styles.listing}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <Animated.Image
          source={{ uri: item.thumbnail_url }}
          style={styles.image}
        />

        <Text style={{ fontSize: 16, fontFamily: "mon-sb", color: "white" }}>
          {item.title}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Ionicons name="time" size={16} color="white" />
          <Text style={{ fontSize: 12, fontFamily: "mon-sb", color: "white" }}>
            {item.duration}
          </Text>
        </View>
        <Text style={{ fontFamily: "mon", color: "white", fontSize: 12 }}>
          {item.description}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
