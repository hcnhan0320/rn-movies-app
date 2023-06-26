import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
import WishlistScreen from '../screens/Wishlist';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import DetailsMovie from '../screens/DetailsMovie';

import { COLORS, FONT, SHADOWS, SIZES } from '../constants';
import { Text, View, StyleSheet } from 'react-native';

import Feather from '../node_modules/@expo/vector-icons/Feather';
import SimilarMovieCard from '../components/similarMovies/SimilarMovieCard';
import WatchMovieScreen from '../screens/WatchMovie';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
   return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
         <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
         <HomeStack.Screen name="DetailsMovieScreen" component={DetailsMovie} />
         <HomeStack.Screen
            name="WatchMovieScreen"
            component={WatchMovieScreen}
         />
      </HomeStack.Navigator>
   );
};

const SearchStackScreen = () => {
   return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
         <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
         <HomeStack.Screen name="DetailsMovieScreen" component={DetailsMovie} />
      </HomeStack.Navigator>
   );
};

const Tabs = () => {
   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
               let iconName;

               if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home';
               } else if (route.name === 'Search') {
                  iconName = focused ? 'search' : 'search';
               } else if (route.name === 'Wishlist') {
                  iconName = focused ? 'heart' : 'heart';
               } else if (route.name === 'Profile') {
                  iconName = focused ? 'user' : 'user';
               }

               // You can return any component that you like here!
               return (
                  <View
                     style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 8,
                     }}
                  >
                     {/* <Ionicons name={iconName} size={size} color={color} /> */}
                     <Feather
                        name={iconName}
                        size={SIZES.xLarge}
                        color={color}
                     />
                     <Text
                        style={{
                           color: focused ? COLORS.yellow : COLORS.white,
                           fontSize: 10,
                           top: 4,
                        }}
                     >
                        {route.name}
                     </Text>
                  </View>
               );
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: COLORS.yellow,
            tabBarInactiveTintColor: COLORS.white,
            tabBarStyle: {
               position: 'absolute',
               // bottom: 24,
               // left: 16,
               // right: 16,
               overflow: 'hidden',
               height: 80,
               borderTopWidth: 0,
               borderTopWidth: 1,
               borderTopColor: COLORS.shadowGold,
               backgroundColor: COLORS.darkGray,
            },
         })}
      >
         <Tab.Screen name="Home" component={HomeStackScreen} />
         <Tab.Screen name="Search" component={SearchStackScreen} />
         {/* <Tab.Screen name="Wishlist" component={WishlistScreen} /> */}
         <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
   );
};

export default Tabs;
