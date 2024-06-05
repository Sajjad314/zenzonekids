import VideoList from "@/components/videos/VideoList";
import Colors from "@/constants/Colors";
import { IVideoResponse } from "@/interfaces/videos/videoResponse";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";

const Videos = () => {
  const [videosResponse, setVideosResponse] = useState<IVideoResponse[]>([]);

  const getAllVideos = () => {
    fetch("https://sos-backend-00wx.onrender.com/api/videos", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setVideosResponse(data.body);
        console.log(data.body);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        height: 100,
        flex: 1,
      }}
    >
      <VideoList videoResponse={videosResponse} />
    </View>
  );
};

export default Videos;
