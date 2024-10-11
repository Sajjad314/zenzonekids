import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors"; // Your color constants
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@/context/authContext";

const Profile = () => {

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [userId, setUserId] = useState("");
  const {id} = useAuth()

  const getProfileInfo = (id:string) => {
    console.log("here");

    fetch(
      `https://sos-backend-lheb.onrender.com/api/users/${id}`,
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
        setName(data.body.name)
        setEmail(data.body.email)
        setStatus(data.body.status)
        setCreateDate(data.body.createdAt)
        setUpdateDate(data.body.updatedAt)
        setAddress(data.body.address)
        setPhone(data.body.phone)
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error);
      });
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Phone:", phone, "Address:", address);
  };
  useEffect(()=>{
    if(id.length !== 0){
      getProfileInfo(id)
    }
    
  },[id])

  return (
    <View style={styles.container}>
      {/* Top Section: Profile Info */}
      <View style={styles.profileCard}>
        {/* Name and Email */}
        <Text style={styles.profileText}>{name}</Text>
        <Text style={styles.profileText}>{email}</Text>

        {/* Status */}
        <View style={styles.profileRow}>
          <Text style={styles.profileText}>Status: </Text>
          <Text style={styles.profileText}>
            {status === "active" ? "Active" : "Free"}
          </Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileText}>Joined At: </Text>
          <Text style={styles.profileText}>
            {createDate.length>0 && new Date(createDate).toISOString().split('T')[0]}
          </Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileText}>Updated: </Text>
          <Text style={styles.profileText}>
          {updateDate.length>0 &&new Date(updateDate).toISOString().split('T')[0]}
          </Text>
        </View>
      </View>

      {/* Input Section: Phone & Address */}
      <View style={styles.inputSection}>
      <TextInput
        autoCapitalize="none"
        placeholder="Phone"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        value={phone}
        onChangeText={setAddress}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Address"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        value={address}
        onChangeText={setPhone}
      />
        {/* <TextInput
          placeholder="Address"
          placeholderTextColor={"black"}
          value={address}
          onChangeText={setAddress}
          style={styles.inputField}
        /> */}
      </View>

      {/* Submit Button */}
      {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={[defaultStyles.btn,{paddingHorizontal:50}]} onPress={handleSubmit}>
        <Text style={defaultStyles.btnText}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center", // Center everything horizontally
    width:"100%"
  },
  profileCard: {
    backgroundColor: Colors.cardColor,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: "center", // Center text horizontally in the profileCard
    width:"100%"
  },
  profileText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
    textAlign: "center",
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "center", // Center label and value in one line
    marginBottom: 10,
  },
  inputSection: {
    backgroundColor: Colors.bgColor,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%', // Fill the width
  },
  inputField: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.white,
  },
  submitButton: {
    backgroundColor: Colors.buttonGradientStart,
    paddingVertical: 10,
    paddingHorizontal: 50, // Smaller width for the button
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signOutButton: {
    backgroundColor: Colors.buttonGradientStart,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Profile;
