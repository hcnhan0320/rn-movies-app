import React, { useContext, useState } from 'react';

import {
   View,
   Text,
   SafeAreaView,
   TextInput,
   TouchableOpacity,
} from 'react-native';

import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';

import Feather from '../node_modules/@expo/vector-icons/Feather';
import { COLORS } from '../constants';
import { AuthContext } from '../context/AuthContext';

const Login = ({ navigation }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { login } = useContext(AuthContext);

   return (
      <SafeAreaView
         style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: COLORS.darkGray,
         }}
      >
         <View style={{ paddingHorizontal: 25 }}>
            <View style={{ alignItems: 'center' }}>
               <LoginSVG width={400} height={400} />
            </View>
            <Text
               style={{
                  color: COLORS.yellow,
                  fontFamily: 'DMBold',
                  fontSize: 28,
                  marginBottom: 30,
               }}
            >
               Login
            </Text>
            <View
               style={{
                  flexDirection: 'row',
                  borderBottomColor: COLORS.gray2,
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                  marginBottom: 25,
               }}
            >
               <Feather
                  name="at-sign"
                  size={20}
                  color={COLORS.gray2}
                  style={{ marginRight: 5 }}
               />
               <TextInput
                  placeholder="Email-ID"
                  placeholderTextColor={COLORS.infield}
                  style={{
                     flex: 1,
                     paddingVertical: 0,
                     color: COLORS.infield,
                  }}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
               />
            </View>
            <View
               style={{
                  flexDirection: 'row',
                  borderBottomColor: COLORS.gray2,
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                  marginBottom: 25,
               }}
            >
               <Feather
                  name="lock"
                  size={20}
                  color={COLORS.gray2}
                  style={{ marginRight: 5 }}
               />
               <TextInput
                  placeholder="Password"
                  placeholderTextColor={COLORS.infield}
                  style={{
                     flex: 1,
                     paddingVertical: 0,
                     color: COLORS.infield,
                  }}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
               />
            </View>

            <TouchableOpacity
               onPress={() => {
                  login(email, password);
               }}
               style={{
                  backgroundColor: COLORS.yellow,
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 30,
               }}
            >
               <Text
                  style={{
                     textAlign: 'center',
                     fontFamily: 'DMBold',
                     fontSize: 16,
                     color: COLORS.mediumGray,
                  }}
               >
                  Login
               </Text>
            </TouchableOpacity>

            <Text
               style={{
                  textAlign: 'center',
                  color: COLORS.infield,
                  marginBottom: 30,
                  fontFamily: 'DMLight',
               }}
            >
               Or, login with ...
            </Text>

            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 30,
               }}
            >
               <TouchableOpacity
                  onPress={() => {}}
                  style={{
                     borderColor: COLORS.gray2,
                     borderWidth: 2,
                     borderRadius: 10,
                     paddingHorizontal: 30,
                     paddingVertical: 10,
                  }}
               >
                  <GoogleSVG height={24} width={24} />
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => {}}
                  style={{
                     borderColor: COLORS.gray2,
                     borderWidth: 2,
                     borderRadius: 10,
                     paddingHorizontal: 30,
                     paddingVertical: 10,
                  }}
               >
                  <FacebookSVG height={24} width={24} />
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => {}}
                  style={{
                     borderColor: COLORS.gray2,
                     borderWidth: 2,
                     borderRadius: 10,
                     paddingHorizontal: 30,
                     paddingVertical: 10,
                  }}
               >
                  <TwitterSVG height={24} width={24} />
               </TouchableOpacity>
            </View>
            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 30,
               }}
            >
               <Text style={{ color: COLORS.infield, fontFamily: 'DMLight' }}>
                  New to the app?
               </Text>
               <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
               >
                  <Text style={{ color: COLORS.yellow, fontFamily: 'DMBold' }}>
                     {' '}
                     Register
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
   );
};

export default Login;
