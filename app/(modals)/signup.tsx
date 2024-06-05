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
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const onSignUpPress = async () => {
    console.log("hello", isLoaded);

    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      await handleSignUp();
      router.push("/");
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://sos-backend-00wx.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firstName + " " + lastName,
          email: emailAddress,
          password: password,
        }),
      });
      if (response.ok) {
        console.log("successfull ", response);
      } else {
        console.error("Backend registration failed", response);
      }
    } catch (error) {
      console.error("Backend registration failed", error);
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Firstname"
            value={firstName}
            onChangeText={setFirstName}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Lastname"
            value={lastName}
            onChangeText={setLastName}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
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
        <TouchableOpacity style={{position:"absolute", right:20}} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="grey" />
        </TouchableOpacity>
      </View>

          <TouchableOpacity style={defaultStyles.btn} onPress={onSignUpPress}>
            <Text style={defaultStyles.btnText}>{loading ? "Signing In..." : "Continue"}</Text>
          </TouchableOpacity>

          <Text style={{ color: "white", textAlign: "center", margin: 16 }}>
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/(modals)/login")}
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
        </View>
      )}
      {pendingVerification && (
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={setCode}
            style={[defaultStyles.inputField, { marginBottom: 30 }]}
          />

          <TouchableOpacity style={defaultStyles.btn} onPress={onPressVerify}>
            <Text style={defaultStyles.btnText}>{loading ? "Verifying..." : "Verify Emai"}l</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom:30
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    position:"relative"
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
