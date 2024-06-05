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
  Image
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export const LastReadCard= ({ item }:{item:IBlogListResponse}) => (
  <Link href={`/listings/${item.id}`} asChild>
    <TouchableOpacity>
      <Animated.View
        style={styles.listing}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 10,
            width: (3*width) / 4 -60,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "mon-sb", color: "white" }}>
            {item.title}
          </Text>
          <Text style={{ fontFamily: "mon", color: "white" }}>
            {item.description}
          </Text>
        </View>
        <Image
          source={{ uri: item?.thumbnail_url }}
          style={[styles.image]}
        />
      </Animated.View>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  listing: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    gap: 10,
    margin: 16,
    backgroundColor: Colors.cardColor,
    borderRadius: 20,
    paddingVertical:10
  },
  image: {
    width: width / 4 ,
    height: 100,
    borderRadius: 10,
  },
});
