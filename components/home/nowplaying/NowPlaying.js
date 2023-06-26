import {
   View,
   Text,
   TouchableOpacity,
   FlatList,
   Dimensions,
   Animated,
   StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../constants';
import { Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect } from 'react-native-svg';
import Rating from '../../../constants/rating';
import Genres from '../../../constants/genres';
import movieApi, { movieType } from '../../../service/API';
import Loading from '../../loading/Loading';

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Backdrop = ({ movies, scrollX }) => {
   return (
      <View
         style={{
            position: 'absolute',
            width: width,
            height: BACKDROP_HEIGHT,
         }}
      >
         <FlatList
            data={[{ id: 'right-spacer' }, { id: 'left-spacer' }, ...movies]}
            keyExtractor={(item) => item?.id}
            renderItem={({ item, index }) => {
               if (!item?.coverimage) {
                  return null;
               }
               const translateX = scrollX.interpolate({
                  inputRange: [
                     (index - 2) * ITEM_SIZE,
                     (index - 1) * ITEM_SIZE,
                  ],
                  outputRange: [0, width],
               });

               return (
                  <MaskedView
                     style={{ position: 'absolute' }}
                     maskElement={
                        <AnimatedSvg
                           width={width}
                           height={height}
                           viewBox={`0 0 ${width} ${height}`}
                           style={{ transform: [{ translateX }] }}
                        >
                           <Rect
                              x={0}
                              y={0}
                              width={width}
                              height={height}
                              fill="red"
                           />
                        </AnimatedSvg>
                     }
                  >
                     {/* {console.log(`${IMAGE_POSTER_URL}${item?.backdrop_path}`)} */}
                     <Image
                        source={{
                           uri: `${item?.coverimage}`,
                        }}
                        style={{
                           width: width,
                           height: BACKDROP_HEIGHT,
                           resizeMode: 'cover',
                        }}
                     />
                  </MaskedView>
               );
            }}
         />
         <LinearGradient
            colors={['rgba(0, 0, 0, 0)', COLORS.darkGray]}
            style={{
               height: BACKDROP_HEIGHT,
               width,
               position: 'absolute',
               bottom: 0,
            }}
         />
      </View>
   );
};

const NowPlaying = ({ props, navigation }) => {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      const getMovies = async () => {
         const params = {
            keyword: movieType.popular_movie,
            category: props.category || '',
            genre: props.genre || '',
            page: 1,
            limit: 6,
         };
         try {
            const response = await movieApi.getMovies({ params });
            setMovies(response.data);
            setIsLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getMovies();
   }, []);

   const scrollX = React.useRef(new Animated.Value(0)).current;
   return (
      <View style={{ flex: 1, backgroundColor: COLORS.darkGray }}>
         {isLoading ? (
            <Loading />
         ) : (
            <View>
               <Backdrop movies={movies} scrollX={scrollX} />
               {
                  <Animated.FlatList
                     showsHorizontalScrollIndicator={false}
                     horizontal={true}
                     data={[
                        { id: 'left-spacer' },
                        ...movies,
                        { id: 'right-spacer' },
                     ]}
                     keyExtractor={(item) => item.id}
                     pagingEnabled
                     snapToInterval={ITEM_SIZE}
                     bounces={false}
                     onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                     )}
                     scrollEventThrottle={16}
                     decelerationRate={0}
                     contentContainerStyle={{ alignItems: 'center' }}
                     renderItem={({ item, index }) => {
                        if (!item.profileimage) {
                           return (
                              <View
                                 style={{
                                    width: EMPTY_ITEM_SIZE,
                                 }}
                              />
                           );
                        }

                        const inputRange = [
                           (index - 2) * ITEM_SIZE,
                           (index - 1) * ITEM_SIZE,
                           index * ITEM_SIZE,
                        ];
                        const translateY = scrollX.interpolate({
                           inputRange,
                           outputRange: [200, 150, 200],
                           extrapolate: 'clamp',
                        });

                        return (
                           <View style={{ width: ITEM_SIZE, height: height }}>
                              <Animated.View
                                 style={{
                                    marginHorizontal: 8,
                                    padding: 16,
                                    alignItems: 'center',
                                    borderRadius: 32,
                                    transform: [{ translateY }],
                                    backgroundColor: COLORS.darkGray,
                                 }}
                              >
                                 <TouchableOpacity
                                    style={styles.image}
                                    onPress={() =>
                                       navigation.navigate(
                                          'DetailsMovieScreen',
                                          {
                                             movieId: item?.id,
                                             genres: item?.genres.map(
                                                (genre) => genre.name
                                             ),
                                          }
                                       )
                                    }
                                 >
                                    <Image
                                       style={styles.image}
                                       source={{
                                          uri: `${item?.profileimage}`,
                                       }}
                                    />
                                 </TouchableOpacity>
                                 <Text
                                    className="text-lg text-white font-semibold"
                                    numberOfLines={1}
                                 >
                                    {item?.name}
                                 </Text>
                                 <Rating rating={item?.avgrating} />
                                 <Genres
                                    genres={item?.genres
                                       .slice(0, 4)
                                       .map((genre) => genre.name)}
                                 />

                                 <Text
                                    className="text-sm text-infield"
                                    numberOfLines={3}
                                 >
                                    {item?.releasedate}
                                 </Text>

                                 <Text
                                    className="text-sm text-infield"
                                    numberOfLines={3}
                                 >
                                    {item?.category}
                                 </Text>
                              </Animated.View>
                           </View>
                        );
                     }}
                  />
               }
            </View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   image: {
      width: '100%',
      height: ITEM_SIZE * 1.2,
      resizeMode: 'cover',
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
   },
   listTab: {
      position: 'absolute',
      backgroundColor: COLORS.darkGray,
      flexDirection: 'row',
      alignSelf: 'center',
      top: 64,
      borderRadius: 16,
   },
   btnTab: {
      width: width / 5,
      flexDirection: 'row',
      padding: 16,
      justifyContent: 'center',
   },
   btnTabActive: {
      backgroundColor: COLORS.yellow,
      borderRadius: 16,
   },
   textTab: {
      fontSize: 12,
      color: COLORS.white,
   },
});

export default NowPlaying;

// const genres = {
//    12: 'Adventure',
//    14: 'Fantasy',
//    16: 'Animation',
//    18: 'Drama',
//    27: 'Horror',
//    28: 'Action',
//    35: 'Comedy',
//    36: 'History',
//    37: 'Western',
//    53: 'Thriller',
//    80: 'Crime',
//    99: 'Documentary',
//    878: 'Science Fiction',
//    9648: 'Mystery',
//    10402: 'Music',
//    10749: 'Romance',
//    10751: 'Family',
//    10752: 'War',
//    10770: 'TV Movie',
// };
