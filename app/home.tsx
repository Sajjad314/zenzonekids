import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image } from 'react-native';

import { defaultStyles } from '@/constants/Styles';
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';
import { TabRouter } from '@react-navigation/native';

const Page = () => {

  const router = useRouter();

    const onLoginPress = () =>{
        router.push("/login")
    }


  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} /> 
      
      <TouchableOpacity style={[defaultStyles.btn,{marginBottom:30,backgroundColor:Colors.cardColor}]} onPress={onLoginPress}>
        <Text style={defaultStyles.btnText}>{"Purchase"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={defaultStyles.btn} onPress={onLoginPress}>
        <Text style={defaultStyles.btnText}>{ "Continue To Login"}</Text>
      </TouchableOpacity>
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