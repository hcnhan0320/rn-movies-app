import {
   View,
   Text,
   StyleSheet,
   Image,
   Dimensions,
   SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import {
   FlatList,
   ScrollView,
   TouchableOpacity,
} from 'react-native-gesture-handler';
import movieApi from '../service/API';
import Genres from '../constants/genres';
import { COLORS, images } from '../constants';
import ItemSeparator from '../constants/item';
import Feather from '../node_modules/@expo/vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import SimilarMovieCard from '../components/similarMovies/SimilarMovieCard';
import Loading from '../components/loading/Loading';

const { height, width } = Dimensions.get('window');

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const DetailsMovie = ({ route, navigation }) => {
   const { movieId, genres } = route.params;
   const [detailsMovie, setDetailsMovie] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      const getDetailsMovie = async () => {
         try {
            const response = await movieApi.getDetail(
               `${JSON.stringify(movieId)}`
            );
            setDetailsMovie(response);
            setIsLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getDetailsMovie();
   }, []);

   return (
      <View style={styles.container}>
         {isLoading ? (
            <Loading />
         ) : (
            <ScrollView>
               <StatusBar style="light" />
               <LinearGradient
                  colors={['rgba(0, 0, 0, 0.5)', 'rgba(217, 217, 217, 0)']}
                  start={[0, 0.3]}
                  style={styles.linearGradient}
               />
               <View style={styles.moviePosterImageContainer}>
                  <Image
                     style={styles.moviePosterImage}
                     resizeMode="center"
                     source={{
                        uri: `${detailsMovie.coverimage}`,
                     }}
                     // source={require('../assets/images/nhan.jpg')}
                  />
               </View>
               <View style={styles.headerContainer}>
                  <TouchableOpacity
                     activeOpacity={0.5}
                     onPress={() => navigation.goBack()}
                  >
                     <Feather
                        name="chevron-left"
                        size={35}
                        color={COLORS.white}
                     />
                  </TouchableOpacity>
               </View>
               <View style={styles.playButton}>
                  <TouchableOpacity
                     onPress={() =>
                        navigation.navigate('WatchMovieScreen', {
                           movieId: detailsMovie?.id,
                           category: detailsMovie?.category,
                           episodes: detailsMovie?.episodes,
                        })
                     }
                  >
                     <Feather
                        name="play-circle"
                        size={70}
                        color={COLORS.white}
                     />
                  </TouchableOpacity>
               </View>

               <ItemSeparator height={setHeight(37)} />
               <View style={styles.movieTitleContainer}>
                  <Text style={styles.movieTitle} numberOfLines={2}>
                     {detailsMovie?.name}
                  </Text>
                  <View style={styles.row}>
                     <AntDesign name="star" size={16} color={COLORS.yellow} />
                     <Text style={styles.ratingText}>
                        {detailsMovie?.avgrating}
                     </Text>
                  </View>
               </View>
               <View style={styles.genreContainer}>
                  <Text style={styles.genreTitle}>Genre</Text>
                  <Genres genres={genres} />
               </View>
               <View style={styles.overviewContainer}>
                  <Text style={styles.overviewTitle}>Overview</Text>
                  <Text style={styles.overviewText}>
                     {detailsMovie.description?.slice(3, -4)}
                  </Text>
               </View>
               <View style={styles.similarContainer}>
                  <Text style={styles.similarTitle}>Similar Movies</Text>
                  <SimilarMovieCard
                     movieId={detailsMovie?.id}
                     navigation={navigation}
                  />
               </View>

               {/* create space */}
               <View style={styles.similarContainer}>
                  <Text style={styles.similarTitle}></Text>
                  <Text style={styles.similarTitle}></Text>
               </View>
            </ScrollView>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.darkGray,
   },
   moviePosterImageContainer: {
      height: setHeight(35),
      width: setWidth(145),
      alignItems: 'center',
      position: 'absolute',
      left: setWidth((100 - 145) / 2),
      top: 0,
      borderBottomRightRadius: 300,
      borderBottomLeftRadius: 300,
      elevation: 8,
   },
   moviePosterImage: {
      borderBottomRightRadius: 300,
      borderBottomLeftRadius: 300,
      width: setWidth(145),
      height: setHeight(35),
   },
   linearGradient: {
      width: setWidth(100),
      height: setHeight(6),
      position: 'absolute',
      top: 0,
      elevation: 9,
   },
   headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      position: 'absolute',
      right: 0,
      left: 0,
      top: 50,
      elevation: 20,
   },
   headerText: {
      color: COLORS.white,
   },
   playButton: {
      position: 'absolute',
      top: 110,
      left: setWidth(50) - 70 / 2,
      elevation: 10,
   },
   movieTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
   },
   movieTitle: {
      color: COLORS.white,
      fontSize: 22,
      width: setWidth(50),
      fontFamily: 'DMBold',
   },
   ratingText: {
      marginLeft: 5,
      color: COLORS.yellow,
      fontSize: 16,
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   overviewContainer: {
      backgroundColor: COLORS.title,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
   },
   overviewTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontFamily: 'DMBold',
   },
   overviewText: {
      color: COLORS.infield,
      paddingVertical: 5,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'DMLight',
   },
   genreContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
   },
   genreTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontFamily: 'DMBold',
   },
   similarContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
   },
   similarTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontFamily: 'DMBold',
   },
   // castTitle: {
   //    marginLeft: 20,
   //    color: COLORS.BLACK,
   //    fontFamily: FONTS.BOLD,
   //    fontSize: 18,
   // },
   // castSubMenuContainer: {
   //    marginLeft: 20,
   //    flexDirection: 'row',
   //    marginVertical: 5,
   // },
   // castSubMenuText: {
   //    marginRight: 10,
   //    color: COLORS.BLACK,
   //    fontFamily: FONTS.BOLD,
   //    fontSize: 13,
   // },
   // extraListTitle: {
   //    marginLeft: 20,
   //    color: COLORS.BLACK,
   //    fontFamily: FONTS.BOLD,
   //    fontSize: 18,
   //    marginVertical: 8,
   // },
});

export default DetailsMovie;

{
   {
      /* 
         {detailsMovie.genres.map((genre, i) => {
            console.log(genre.name);
         })} */
   }

   /* <Button title="Go back" onPress={() => navigation.goBack()} /> */
}
