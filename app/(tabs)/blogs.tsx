import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import Listings from "@/components/Blog/BlogList";
import { IBlogListResponse } from "@/interfaces/blog/blogResponse";

const Blogs = () => {
  const [blogResponse, setBloResponse] = useState<IBlogListResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getAllBlogs = () => {
    console.log("here");

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
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error);
      });
  };

  const handleSearch = () => {
    console.log("here");

    fetch(
      `https://sos-backend-lheb.onrender.com/api/blogs/search/${searchQuery}`,
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
        setBloResponse(data.body);
        console.log(data.body);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllBlogs();
    console.log("hello");
  }, []);

  useEffect(() => {
    if (searchQuery.length === 0) {
      getAllBlogs();
    } else {
      handleSearch();
    }
  }, [searchQuery]);
  return (
    <View
      style={{
        backgroundColor: Colors.bgColor,
        height: "100%",
        flex: 1,
      }}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search blogs..."
          placeholderTextColor={Colors.white}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update search query state
        />
      </View>
      <Listings listings={blogResponse} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    height: 60,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    paddingVertical: 20,
  },
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

export default Blogs;
