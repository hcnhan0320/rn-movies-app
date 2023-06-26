import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { COLORS } from '../constants';
import movieApi from '../service/API';
const { width, height } = Dimensions.get('window');

const WatchMovieScreen = ({ route, navigation }) => {
   const video = React.useRef(null);
   const { movieId, category, episodes } = route.params;
   const [isLoading, setIsLoading] = useState(false);
   const [videoMovie, setVideoMovie] = useState();
   const [status, setStatus] = useState({});
   // const [episode, setEpisode] = useState(1);

   useEffect(() => {
      setIsLoading(true);
      const getVideoMovie = async () => {
         try {
            let response = null;
            if (category === 'phim lẻ') {
               response = await movieApi.getVideo(`${JSON.stringify(movieId)}`);
            } else {
               response = await movieApi.getVideoBySeries(
                  `${JSON.stringify(movieId)}`
               );
            }
            setVideoMovie(response);
            console.log(response);
            setIsLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getVideoMovie();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.videoContainer}>
            <Video
               ref={video}
               style={styles.video}
               source={{
                  uri: `${videoMovie?.video_url}`,
               }}
               useNativeControls
               resizeMode={ResizeMode.CONTAIN}
               isLooping
               onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.darkGray,
   },
   videoContainer: {
      width,
      height: height / 3,
      marginVertical: height / 3,
   },
   video: {
      width,
      height: height / 3,
   },
});
export default WatchMovieScreen;
