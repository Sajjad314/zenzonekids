import Colors from "@/constants/Colors";
import { ITableListResponse } from "@/interfaces/table/tableResponse";
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

export const renderRow: ListRenderItem<string> = ({ item }) => (
  <Link href={`/listings/${item}`} asChild>
    <TouchableOpacity>
      <Animated.View
        style={styles.listing}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <Animated.Image
          source={require("@/assets/images/table.png")}
          style={styles.image}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            marginHorizontal: 8,
            height: 100, // Optional: Set height for proper centering
          }}
        >
          <Text
            style={{
              fontSize: 24, // Larger font size for h1 effect
              fontFamily: "mon-sb",
              color: "white",
              textAlign: "center", // Ensures the text aligns in the center
            }}
          >
            Table {item}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}></View>
      </Animated.View>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  listing: {
    // padding: 8,
    gap: 10,
    marginVertical: 16,
    backgroundColor: Colors.cardColor,
    width: width / 2 - 20,
    borderRadius: 20,
    height: "100%",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
});
