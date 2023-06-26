import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';

import Feather from '../node_modules/@expo/vector-icons/Feather';

const Onboarding = ({ navigation }) => {
   return (
      <SafeAreaView
         style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.darkGray,
         }}
      >
         <View style={{ marginTop: 20 }}>
            <Text
               style={{
                  fontFamily: 'DMExtraBold',
                  fontSize: 30,
                  color: COLORS.yellow,
               }}
            >
               ACMOVIES
            </Text>
         </View>
         <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
         >
            <Image
               style={{
                  width: 300,
                  height: 300,
                  // transform: [{ rotate: '-15deg' }]
               }}
               resizeMode="cover"
               source={require('../assets/images/movie.png')}
            />
         </View>

         <TouchableOpacity
            style={{
               backgroundColor: COLORS.yellow,
               padding: 20,
               width: '90%',
               borderRadius: 10,
               marginBottom: 50,
               flexDirection: 'row',
               justifyContent: 'space-between',
            }}
            onPress={() => navigation.navigate('Login')}
         >
            <Text
               style={{
                  color: COLORS.darkGray,
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: '700',
                  fontStyle: 'italic',
               }}
            >
               Let's Begin
            </Text>
            <Feather name="arrow-right" size={22} color={COLORS.darkGray} />
         </TouchableOpacity>
      </SafeAreaView>
   );
};

export default Onboarding;
