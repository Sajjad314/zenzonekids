import Colors from "@/constants/Colors";
import { IBillItem } from "@/interfaces/item/billItem";
import { IItemResponse } from "@/interfaces/item/itemResponse";
import { ITableListResponse } from "@/interfaces/table/tableResponse";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const DetailsPage = () => {
  const [billItem, setBillItem] = useState<ITableListResponse>();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const menuItems: IItemResponse[] = [
    { _id: "1", name: "Cheeseburger", price: 12.5, available: true },
    { _id: "2", name: "French Fries", price: 6, available: true },
    { _id: "3", name: "Chicken Wings", price: 8.5, available: true },
    { _id: "4", name: "Chocolate Cake", price: 10.25, available: true },
    { _id: "5", name: "Caesar Salad", price: 9, available: true },
    { _id: "6", name: "Cheeseburger", price: 12.5, available: true },
    { _id: "7", name: "French Fries", price: 6, available: true },
    { _id: "8", name: "Chicken Wings", price: 8.5, available: true },
    { _id: "9", name: "Chocolate Cake", price: 10.25, available: true },
    { _id: "10", name: "Caesar Salad", price: 9, available: true },
    { _id: "11", name: "Cheeseburger", price: 12.5, available: true },
    { _id: "12", name: "French Fries", price: 6, available: true },
    { _id: "13", name: "Chicken Wings", price: 8.5, available: true },
    { _id: "14", name: "Chocolate Cake", price: 10.25, available: true },
    { _id: "15", name: "Caesar Salad", price: 9, available: true },
    { _id: "16", name: "Cheeseburger", price: 12.5, available: true },
    { _id: "17", name: "French Fries", price: 6, available: true },
    { _id: "18", name: "Chicken Wings", price: 8.5, available: true },
    { _id: "19", name: "Chocolate Cake", price: 10.25, available: true },
    { _id: "20", name: "Caesar Salad", price: 9, available: true },
  ];

  const addItemToBill = (item: IItemResponse) => {
    if (billItem) {
      const existingItem = billItem?.itemsOrdered.find(
        (billItem) => billItem.itemId === item._id
      );
      const upDatedTotalAmount = billItem
        ? billItem.totalAmount + item.price
        : 0;

      if (existingItem) {
        const updatedBillItems = billItem?.itemsOrdered.map((billItem) =>
          billItem.itemId === item._id
            ? { ...billItem, quantity: billItem.quantity + 1 }
            : billItem
        );
        setBillItem({
          _id: billItem._id,
          createdAt: billItem.createdAt,
          customerName: billItem.customerName,
          itemsOrdered: updatedBillItems!,
          tableNumber: billItem.tableNumber,
          totalAmount: upDatedTotalAmount,
        });
      } else {
        setBillItem({
          _id: billItem._id,
          createdAt: billItem.createdAt,
          customerName: billItem.customerName,
          itemsOrdered: [
            ...billItem.itemsOrdered!,
            {
              itemId: item._id,
              name: item.name,
              price: item.price,
              quantity: 1,
            },
          ],
          tableNumber: billItem.tableNumber,
          totalAmount: upDatedTotalAmount,
        });
      }
    } else {
      setBillItem({
        _id: "aaaaa",
        createdAt: Date.now().toString(),
        customerName: "Aaaa",
        itemsOrdered: [
          { itemId: item._id, name: item.name, price: item.price, quantity: 1 },
        ],
        tableNumber: 1,
        totalAmount: item.price,
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:`Table - ${id}`,
      headerTransparent: false,
      headerTitleStyle:{marginHorizontal:10,color:"white"},
      headerBackground: () => (
        <View
          style={[ styles.header]}
        ></View>
      ),

      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.billSection}>
        <Text style={styles.sectionTitle}>Bill</Text>
        <FlatList
          data={billItem?.itemsOrdered}
          keyExtractor={(item) => item.itemId}
          renderItem={({ item }) => (
            <View style={styles.billItem}>
              <Text style={styles.itemText}>
                {item.name} x {item.quantity}
              </Text>
              <Text style={styles.itemText}>
                ${item.price.toFixed(2)}
              </Text>
            </View>
          )}
        />
        <Text style={styles.totalAmount}>
          Total: ${billItem?.totalAmount.toFixed(2)}
        </Text>
      </View>

      {/* Bottom Section: Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Menu</Text>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => addItemToBill(item)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.bgColor
  },
  billSection: {
    flex: 1,
    backgroundColor: Colors.cardColor,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuSection: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color:Colors.white
  },
  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    backgroundColor: Colors.cardColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    color:Colors.white
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
    color:Colors.white
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.white,
  },
  header: {
    backgroundColor: Colors.bgColor,
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
});

export default DetailsPage;
