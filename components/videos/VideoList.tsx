import Colors from "@/constants/Colors";
import { IVideoResponse } from "@/interfaces/videos/videoResponse";
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { VideoItem } from "./VideoItem";

const VideoList = ({ videoResponse }: { videoResponse: IVideoResponse[] }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={videoResponse}
        renderItem={({ item }) => <VideoItem videoResponse={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
});

export default VideoList;
