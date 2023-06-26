import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   Image,
   ScrollView,
   TouchableWithoutFeedback,
   Dimensions,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import Loading from '../components/loading/Loading';
import movieApi from '../service/API';
import { COLORS } from '../constants';

const { width, height } = Dimensions.get('window');
const SearchScreen = ({ navigation }) => {
   const [results, setResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const handleSearch = (search) => {
      if (search && search.length > 1) {
         movieApi.getMoviesbyKey(search, { limit: 12 }).then((res) => {
            setIsLoading(false);
            if (res && res.data) setResults(res.data);
         });
         setIsLoading(true);
      } else {
         setIsLoading(false);
         setResults([]);
      }
   };

   const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

   return (
      <SafeAreaView className="bg-neutral-800 flex-1">
         {/* search input */}
         <View className="mx-4 mb-3 flex-row justify-between items-center border border-yellow rounded-full">
            <TextInput
               onChangeText={handleTextDebounce}
               placeholder="Search Movie"
               placeholderTextColor={'lightgray'}
               className="pb-1 pl-6 flex-1 text-base font-light text-infield tracking-wider"
            />
            <TouchableOpacity
               onPress={() => navigation.navigate('Home')}
               className="rounded-full p-3 m-1 bg-yellow"
            >
               <XMarkIcon size="25" color={COLORS.darkGray} />
            </TouchableOpacity>
         </View>

         {/* showresult */}
         {results.length > 0 ? (
            isLoading ? (
               <Loading />
            ) : (
               <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 15 }}
                  className="space-y-3"
               >
                  <Text className="text-white font-semibold ml-1">
                     Results: ({results.length})
                  </Text>
                  <View className="flex-row justify-between flex-wrap">
                     {results.map((item, index) => {
                        return (
                           <TouchableOpacity
                              key={index}
                              onPress={() =>
                                 navigation.navigate('DetailsMovieScreen', {
                                    movieId: item?.id,
                                    genres: item?.genres.map(
                                       (genre) => genre.name
                                    ),
                                 })
                              }
                           >
                              <View className="space-y-2 mb-4">
                                 <Image
                                    source={{
                                       uri: `${item.profileimage}`,
                                    }}
                                    // source={require('../assets/images/nhan.jpg')}
                                    className="rounded-3xl"
                                    style={{
                                       width: width * 0.44,
                                       height: height * 0.3,
                                    }}
                                 />
                                 <Text className="text-gray-300 font-semibold ml-1">
                                    {item.name?.length > 22
                                       ? item.name.slice(0, 22) + '...'
                                       : item.name}
                                 </Text>
                              </View>
                           </TouchableOpacity>
                        );
                     })}
                  </View>
               </ScrollView>
            )
         ) : isLoading ? (
            <Loading />
         ) : (
            <View>
               <View className="flex-row justify-center">
                  <Image
                     source={require('../assets/images/movieTime.png')}
                     className="h-96 w-96"
                  />
               </View>
               <View className="flex-row justify-center">
                  <Text className="text-gray-300 font-light text-xl">
                     Not found movies!
                  </Text>
               </View>
            </View>
         )}
      </SafeAreaView>
   );
};

export default SearchScreen;
