import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from '../constants';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
   const [fontsLoaded] = useFonts({
      DMExtraBold: require('../assets/fonts/Lato-Black.ttf'),
      DMBold: require('../assets/fonts/Lato-Bold.ttf'),
      DMLight: require('../assets/fonts/Lato-Light.ttf'),
      DMRegular: require('../assets/fonts/Lato-Regular.ttf'),
      DMThin: require('../assets/fonts/Lato-Thin.ttf'),
      // DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
      // DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
      // DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
   });

   const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
         await SplashScreen.hideAsync();
      }
   }, [fontsLoaded]);

   if (!fontsLoaded) return null;

   return (
      <Stack
         onLayout={onLayoutRootView}
         screenOptions={{
            headerStyle: { backgroundColor: COLORS.bg },
            headerTintColor: COLORS.primary,
            headerShown: false,
         }}
      />
   );
};
export default Layout;
