import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const router = useRouter();

  const onSignInPress = async () => {
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
        Welcome to Easy Biller
      </Text>

      <TouchableOpacity style={defaultStyles.btn} onPress={onSignInPress}>
        <Text style={defaultStyles.btnText}>
          { "Continue"}
        </Text>
      </TouchableOpacity>
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
    height: 180,
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
