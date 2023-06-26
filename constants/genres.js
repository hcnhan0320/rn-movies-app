import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Genres({ genres }) {
   return (
      <View style={styles.genres}>
         {genres.map((genre) => {
            return (
               <TouchableOpacity key={genre} style={styles.genre}>
                  <Text style={styles.genreText}>{genre}</Text>
               </TouchableOpacity>
            );
         })}
      </View>
   );
}

const styles = StyleSheet.create({
   genres: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginVertical: 10,
   },
   genre: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: COLORS.yellow,
      marginRight: 4,
      marginBottom: 4,
   },
   genreText: {
      fontSize: 12,
      color: COLORS.yellow,
   },
});
