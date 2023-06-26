import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants';

export default function Rating({ rating }) {
   const filledStars = Math.floor(rating / 2);
   const maxStars = Array(5 - filledStars).fill('staro');
   const r = [...Array(filledStars).fill('star'), ...maxStars];

   return (
      <View style={styles.rating}>
         <Text style={styles.ratingNumber}>{rating}</Text>
         {r.map((type, index) => {
            return (
               <AntDesign
                  key={index}
                  name={type}
                  size={16}
                  color={COLORS.yellow}
               />
            );
         })}
      </View>
   );
}

const styles = StyleSheet.create({
   ratingNumber: { marginRight: 8, fontSize: 16, color: COLORS.yellow },
   rating: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 4,
   },
});
