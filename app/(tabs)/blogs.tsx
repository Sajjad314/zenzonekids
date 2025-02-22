import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import Listings from "@/components/Blog/BlogList";
import { ITableListResponse } from "@/interfaces/table/tableResponse";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Blogs = () => {
  const [tableResponse, setTableResponse] = useState<string[]>(["1","2","3","4","5","6","7","8","9","10"]);
  // const getAllBlogs = () => {
  //   console.log("here");

  //   fetch("https://sos-backend-lheb.onrender.com/api/blogs", {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok " + response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setTableResponse(data.body);
  //       console.log(data.body);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       console.log(error);
  //     });
  // };

  

  // useEffect(() => {
  //   getAllBlogs();
  //   console.log("hello");
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
      console.log();
      
    };
    console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllll");
    

    fetchData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.bgColor,
        height: "100%",
        flex: 1,
      }}
    >
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search blogs..."
          placeholderTextColor={Colors.white}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View> */}
      <Listings listings={tableResponse} />
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
    paddingVertical: 10,
  },
  searchBar: {
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 12,
    backgroundColor: Colors.bgColor,
    color: Colors.white,
    marginHorizontal: 15,
  },
});

export default Blogs;
