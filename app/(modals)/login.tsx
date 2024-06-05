import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image } from 'react-native';

import { defaultStyles } from '@/constants/Styles';
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {

  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSignInPress = async () => {
    setLoading(true)
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      router.push("/")
    } catch (err: any) {
      console.log('Error:', JSON.stringify(err, null, 2));
    }finally{
      setLoading(false)
    }
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} /> 
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
        <TouchableOpacity style={{position:"absolute", right:20}} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="grey" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={defaultStyles.btn} onPress={onSignInPress}>
        <Text style={defaultStyles.btnText}>{loading ? "Signing In..." : "Continue"}</Text>
      </TouchableOpacity>

      <Text style={{color: "white",margin:16, textAlign:"center"}}>Don't have an account? <Text onPress={() => router.push("/(modals)/signup")} style={{color:"red",textDecorationLine:"underline",cursor:"pointer"}}>Click here</Text> to sign Up</Text>

      
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'center',
    backgroundColor: Colors.bgColor,
  },
  logo: {
    width: 180,  
    height: 150, 
    alignSelf: 'center', 
    marginBottom: 30,  
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    position:"relative"
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});