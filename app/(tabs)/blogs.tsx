import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import Listings from "@/components/Blog/BlogList";
import listingsData from "@/assets/data/airbnb-listings.json";
import { IBlogListResponse } from "@/interfaces/blog/blogResponse";
import { Stack } from "expo-router";

const Blogs = () => {
  const [blogResponse, setBloResponse] = useState<IBlogListResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getAllBlogs = () => {
    console.log("here");
    
    fetch("https://sos-backend-00wx.onrender.com/api/blogs", {
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

  useEffect(() => {
    getAllBlogs();
    console.log("hello");
    
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // setSearchQuery(query);
    // if (query.trim() === '') {
    //     setFilteredBlogs(blogResponse);
    // } else {
    //     const filteredData = blogResponse.filter(blog =>
    //         blog.title.toLowerCase().includes(query.toLowerCase())
    //     );
    //     setFilteredBlogs(filteredData);
    // }
  };
  return (
    <View
      style={{
        backgroundColor: Colors.bgColor,
        height: "100%",
        flex: 1,
      }}
    >

      <Listings listings={blogResponse} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColor,
        height: 60,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 10,
        },
        paddingVertical:20
      },
  searchBar: {
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 8,
    backgroundColor:Colors.bgColor,
    color:Colors.white,
    margin: 10, // Adjust as needed for spacing
    marginHorizontal:25,
  },
});

export default Blogs;
