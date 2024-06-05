import Colors from "@/constants/Colors";
import { IBlogListResponse } from "@/interfaces/blog/blogResponse";
import { Link } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    ListRenderItem,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";


const { width } = Dimensions.get("window");

export const renderRow: ListRenderItem<IBlogListResponse> = ({ item }) => (
    <Link href={`/listings/${item.id}`} asChild>
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ fontSize: 16, fontFamily: "mon-sb", color: "white" }}
            >
              {item.title}
            </Text>
          </View>
          <Text style={{ fontFamily: "mon", color: "white" }}>
            {item.description}
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}></View>
        </Animated.View>
      </TouchableOpacity>
    </Link>


  );

  const styles = StyleSheet.create({
    listing: {
      padding: 8,
      gap: 10,
      marginVertical: 16,
      backgroundColor: Colors.cardColor,
      width: width / 2 - 20,
      borderRadius: 20,
      height:"100%"
    },
    image: {
      width: "100%",
      height: 100,
      borderRadius: 10,
    },
  
  });