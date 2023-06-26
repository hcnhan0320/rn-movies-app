import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import apiConfig from '../service/apiConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [userToken, setUserToken] = useState(null);
   const [userInfo, setUserInfo] = useState(null);

   const login = (email, password) => {
      setIsLoading(true);
      console.log(`${apiConfig.baseUrl}login`);
      console.log(email, password);
      axios
         .post(`${apiConfig.baseUrl}login`, {
            email,
            password,
         })
         .then((res) => {
            let userInfo = res.data;
            setUserInfo(userInfo.data.user);
            setUserToken(userInfo.data.access_token);

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.data.access_token);
         })
         .catch((error) => {
            console.log(`Loggin error : ${error}`);
         });

      setIsLoading(false);
   };

   const register = (name, email, password) => {
      setIsLoading(true);
      // console.log(`${apiConfig.baseUrl}login`);
      // console.log(email, password);
      axios
         .post(`${apiConfig.baseUrl}register`, {
            name,
            email,
            password,
         })
         .then((res) => {
            let userInfo = res.data;
            setUserInfo(userInfo.data.user);
            setUserToken(userInfo.data.access_token);

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.data.access_token);
         })
         .catch((error) => {
            console.log(`Register error : ${error}`);
         });

      setIsLoading(false);
   };

   const logout = () => {
      setIsLoading(true);
      setUserToken(null);
      AsyncStorage.removeItem('userInfo');
      AsyncStorage.removeItem('userToken');
      setIsLoading(false);
   };

   isLoggedIn = async () => {
      try {
         setIsLoading(true);
         let userInfo = await AsyncStorage.getItem('userInfo');
         let userToken = await AsyncStorage.getItem('userToken');
         userInfo = JSON.parse(userInfo);

         if (userInfo) {
            setUserToken(userToken), setUserInfo(userInfo);
         }

         setUserToken(userToken);
         setIsLoading(false);
      } catch (error) {
         console.log(`isLogged in error ${error}`);
      }
   };

   useEffect(() => {
      isLoggedIn();
   }, []);

   return (
      <AuthContext.Provider
         value={{ login, logout, register, isLoading, userToken, userInfo }}
      >
         {children}
      </AuthContext.Provider>
   );
};
