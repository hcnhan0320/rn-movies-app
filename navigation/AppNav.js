import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import Tabs from '../navigation/Tabs';
import AuthStack from '../navigation/AuthStack';

import { NavigationContainer } from '@react-navigation/native';

import { View, Text, ActivityIndicator } from 'react-native';

const AppNav = () => {
   const { isLoading, userToken, userInfo } = useContext(AuthContext);
   if (isLoading) {
      return (
         <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
         >
            <ActivityIndicator size={'large'} />
         </View>
      );
   }

   return (
      <NavigationContainer independent={true}>
         {userToken !== null ? <Tabs /> : <AuthStack></AuthStack>}
         {/* <AuthStack />
         <Tabs /> */}
      </NavigationContainer>
   );
};

export default AppNav;
