import { Stack } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, icons, images, SIZES } from '../constants';
import { NowPlaying } from '../components';
import { View } from 'react-native';
import { Button } from 'react-native';
import { movieCategory } from '../service/API';
const HomeScreen = ({ navigation }) => {
   return (
      <View style={{ flex: 1, backgroundColor: COLORS.mediumGray }}>
         {/* <Stack.Screen
            options={{
               headerShown: false,
               headerStyle: { backgroundColor: COLORS.darkGray },
               headerShadowVisible: false,
               headerLeft: () => (
                  <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
               ),
               headerRight: () => (
                  <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
               ),
               headerTitle: 'DISCOVER',
            }}
         /> */}
         {/* <ScrollView showsVerticalScrollIndicator={false}>
         </ScrollView> */}
         <NowPlaying props={movieCategory.all_movie} navigation={navigation} />
      </View>
   );
};

export default HomeScreen;
