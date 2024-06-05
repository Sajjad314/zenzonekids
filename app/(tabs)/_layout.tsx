import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
        },
        tabBarStyle: {
          backgroundColor: Colors.bgColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "zenzonekids",
          headerTitleStyle: {
            fontFamily: "mon-sb",
            color: "white",
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          tabBarLabelPosition: "below-icon",
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="blogs"
        options={{
          title: "Blogs",
          headerTitleStyle: {
            fontFamily: "mon-sb",
            color: "white",
          },
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          tabBarLabelPosition: "below-icon",
          tabBarLabel: "Blog",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: "Videos",
          headerTitleStyle: {
            fontFamily: "mon-sb",
            color: "white",
          },
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          tabBarLabelPosition: "below-icon",
          tabBarLabel: "Video",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="video-library" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
