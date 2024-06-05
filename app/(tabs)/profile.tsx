import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      {isSignedIn && <TouchableOpacity style={defaultStyles.btn} onPress={() => signOut()}>
        <Text style={defaultStyles.btnText}>Logout</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default Profile;
