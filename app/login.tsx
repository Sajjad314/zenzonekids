import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import { TabRouter } from "@react-navigation/native";

const Page = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAccessToken, setUserInfo, setRefreshToken, setIsLoggedIn } =
    useAuth();

  const loginCall = () => {
    fetch("https://sos-backend-lheb.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailAddress,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.isSuccess) {
          setAccessToken(data.body.access_token);
          setRefreshToken(data.body.refresh_token);
          setUserInfo(
            data.body.user.email,
            data.body.user.role,
            data.body.user.name,
            data.body.user.id
          );
          setIsLoggedIn(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const onSignInPress = async () => {
    setLoading(true);
    if (!isLoaded) {
      return;
    }

    loginCall();
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />
      <Text
        style={{
          color: "white",
          margin: 24,
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Welcome to Zenzonekids
      </Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        value={emailAddress}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword}
          style={[defaultStyles.inputField, { flex: 1 }]}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={defaultStyles.btn} onPress={onSignInPress}>
        <Text style={defaultStyles.btnText}>
          {loading ? "Signing In..." : "Continue"}
        </Text>
      </TouchableOpacity>

      <Text style={{ color: "white", margin: 16, textAlign: "center" }}>
        Don't have an account?{" "}
        <Text
          onPress={() => router.push("/signup")}
          style={{
            color: "red",
            textDecorationLine: "underline",
            cursor: "pointer",
          }}
        >
          Click here
        </Text>{" "}
        to sign Up
      </Text>

      <View
        style={{
          marginVertical: 20,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          marginHorizontal: 20,
        }}
      />

      {/* New text below the horizontal line */}
      <Text style={{ color: "white", margin: 16, textAlign: "center" }}>
        To unlock all the features of our application{ " "}
        <Text
          onPress={() => alert("Unlock features clicked!")}
          style={{
            color: "red",
            textDecorationLine: "underline",
            cursor: "pointer",
            paddingHorizontal:8
          }}
        >
           Click here
        </Text>
      </Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: "center",
    backgroundColor: Colors.bgColor,
  },
  logo: {
    width: 180,
    height: 150,
    alignSelf: "center",
    marginBottom: 30,
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
