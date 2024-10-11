import VideoList from "@/components/videos/VideoList";
import Colors from "@/constants/Colors";
import { IVideoResponse } from "@/interfaces/videos/videoResponse";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

const Videos = () => {
  const [videosResponse, setVideosResponse] = useState<IVideoResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllVideos = () => {
    fetch("https://sos-backend-lheb.onrender.com/api/videos", {
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

  const handleSearch = () => {
    fetch(
      `https://sos-backend-lheb.onrender.com/api/videos/search/${searchQuery}`,
      {
        method: "GET",
      }
    )
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

  useEffect(() => {
    if (searchQuery.length === 0) {
      getAllVideos();
    } else {
      handleSearch();
    }
  }, [searchQuery]);

  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        height: 100,
        flex: 1,
      }}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Videos..."
          placeholderTextColor={Colors.white}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update search query state
        />
      </View>
      <VideoList videoResponse={videosResponse} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colors.bgColor,
    paddingVertical: 10, // Adds some padding around the search bar
  },
  searchBar: {
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 12,
    backgroundColor: Colors.bgColor,
    color: Colors.white,
    marginHorizontal: 15, // Adjust as needed for spacing
  },
});

export default Videos;
