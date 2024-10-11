import { View, StyleSheet, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { IBlogListResponse } from "@/interfaces/blog/blogResponse";
import Listings from "@/components/Blog/BlogList";
import Colors from "@/constants/Colors";
import { LastReadCard } from "@/components/Blog/LastReadBlogCard";
import { IVideoResponse } from "@/interfaces/videos/videoResponse";
import { VideoItem } from "@/components/videos/VideoItem";
import { useAuth } from "@/context/authContext";

const Page = () => {
  const [blogResponse, setBloResponse] = useState<IBlogListResponse[]>([]);
  const [lastRead, setLastRead] = useState<IBlogListResponse>();
  const [lastWatched, setLastWatched] = useState<IVideoResponse>();
  const { accessToken, email, id, isLoggedIn, name, refreshToken, role } =
    useAuth();

  const getFeaturedBlogs = () => {
    fetch("https://sos-backend-lheb.onrender.com/api/blogs", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setBloResponse(data.body);
        console.log(data.body);
        console.log("data", data.body);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("error", error);
      });
  };

  const getFeaturedVideos = () => {
    fetch("https://sos-backend-lheb.onrender.com/api/videos/featured", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setLastWatched(data.body[0]);
        console.log(data.body);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(
      "aaa",
      accessToken,
      email,
      id,
      isLoggedIn,
      name,
      refreshToken,
      role
    );

    getFeaturedBlogs();
    getFeaturedVideos();
  }, []);

  useEffect(() => {
    if (blogResponse.length > 0) {
      setLastRead(blogResponse[0]);
    }
  }, [blogResponse]);

  return (
    <ScrollView style={styles.container}>
      {blogResponse.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Featured Blogs</Text>
          <Listings listings={blogResponse} />
        </View>
      )}
      {lastRead && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Last Read</Text>
          <LastReadCard item={lastRead} />
        </View>
      )}
      {lastWatched && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Last Watch</Text>
          <VideoItem videoResponse={lastWatched} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  sectionHeader: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.white,
    marginHorizontal: 10,
    marginTop: 40,
  },
});

export default Page;
