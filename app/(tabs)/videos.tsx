import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Videos = () => {
  const [menuItems, setMenuItems] = useState<
    { _id: string; name: string; price: string }[]
  >([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [addStatus, setAddStatus] = useState(false);

  const handleAddItem = () => {
    setAddStatus(true);
    if (!newItem.name || !newItem.price) {
      Alert.alert("Error", "Please enter both name and price.");
      return;
    }

    const addMenuItem = async () => {
      try {
        const docRef = await addDoc(collection(db, "Menu"), newItem);
        console.log("Menu item added!", docRef.id);
        setMenuItems([...menuItems, { _id :docRef.id, name:newItem.name, price: newItem.price}])
      } catch (error) {
        console.error("Error adding menu item:", error);
      } finally {
        setAddStatus(false);
      }
    };
    addMenuItem();
    setNewItem({ name: "", price: "" });
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item._id !== id));
  };

  const handleEditPrice = (id: string, newPrice: string) => {
    const updatedMenuItems = menuItems.map((item) =>
      item._id === id ? { ...item, price: newPrice } : item
    );
    setMenuItems(updatedMenuItems);
  };

  const getMenuItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Menu"));
      let updatedItemsArray: { _id: string; name: string; price: string }[] =
        [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id + "=> " + doc.data().name);

        updatedItemsArray.push({
          _id: doc.id + doc.data().name,
          name: doc.data().name,
          price: doc.data().price,
        });
      });
      setMenuItems(updatedItemsArray);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMenuItems([]);
    getMenuItems();
  }, []);

  const renderMenuItem = ({ item }: any) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.priceButton}
        onPress={() => {
          Alert.prompt(
            "Edit Price",
            `Enter a new price for ${item.name}:`,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Save",
                onPress: (price) => handleEditPrice(item._id, price!),
              },
            ],
            "plain-text",
            item.price.toString()
          );
        }}
      >
        <Text style={styles.itemText}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item._id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {!loading && (
        <>
          <View style={styles.addItemSection}>
            <TextInput
              style={[defaultStyles.inputField, { marginBottom: 15 }]}
              placeholder="Item Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            />
            <TextInput
              style={[defaultStyles.inputField, { marginBottom: 15 }]}
              placeholder="Price"
              keyboardType="numeric"
              value={newItem.price}
              onChangeText={(text) => setNewItem({ ...newItem, price: text })}
            />
            <TouchableOpacity style={defaultStyles.btn} onPress={handleAddItem}>
              {addStatus ? (
                <ActivityIndicator size="large" color={Colors.white} />
              ) : (
                <Text style={styles.addButtonText}>Add Item</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Menu List Section */}
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item._id}
            renderItem={renderMenuItem}
            contentContainerStyle={styles.menuList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    padding: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
  },
  addItemSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  priceButton: {
    padding: 5,
    backgroundColor: "#E8F0FE",
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "#FF4C4C",
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Videos;
