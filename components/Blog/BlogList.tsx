import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import {useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { IBlogListResponse } from "@/interfaces/blog/blogResponse";
import { renderRow } from "./RenderRow";

interface Props {
  listings: IBlogListResponse[];
}


const { width } = Dimensions.get("window");

const Listings = ({ listings: items }: Props) => {
  const listRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
  },

});

export default Listings;
