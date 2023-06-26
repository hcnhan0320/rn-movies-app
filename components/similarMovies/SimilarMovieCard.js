import {
   View,
   Text,
   TouchableOpacity,
   Dimensions,
   Image,
   ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import movieApi from '../../service/API';
import { movieType } from '../../service/API';
const { width, height } = Dimensions.get('window');

const SimilarMovieCard = ({ movieId, navigation }) => {
   const [similarMovies, setSimilarMovies] = useState([]);
   useEffect(() => {
      const getSimilarMovies = async () => {
         try {
            const response = await movieApi.getSimilarMovies(
               `${JSON.stringify(movieId)}`,
               movieType.similar_movie
            );
            setSimilarMovies(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getSimilarMovies();
   }, []);
   return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         {similarMovies.map((item, index) => {
            // {
            //    console.log(similarMovies);
            // }
            return (
               <TouchableOpacity
                  key={index}
                  onPress={() =>
                     navigation.push('DetailsMovieScreen', {
                        movieId: item?.id,
                        genres: item?.genres.map((genre) => genre.name),
                     })
                  }
               >
                  <View className="space-y-1 mr-4 mt-2 ">
                     <Image
                        // source={require('../../assets/images/nhan.jpg')}
                        source={{
                           uri: `${item?.profileimage}`,
                        }}
                        className="rounded-xl"
                        style={{
                           width: width * 0.33,
                           height: height * 0.22,
                        }}
                     />
                     <Text className="text-neutral-300 ml-1">
                        {item.name.length > 14
                           ? item.name.slice(0, 14) + '...'
                           : item.name}
                     </Text>
                  </View>
               </TouchableOpacity>
            );
         })}
      </ScrollView>
   );
};

export default SimilarMovieCard;
