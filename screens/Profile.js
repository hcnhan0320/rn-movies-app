import { useContext } from 'react';
import {
   Text,
   View,
   TouchableOpacity,
   Dimensions,
   StyleSheet,
   Image,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../constants';
const { width, height } = Dimensions.get('window');
const ProfileScreen = () => {
   const { logout, userInfo } = useContext(AuthContext);
   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image
               style={styles.image}
               source={require('../assets/images/nhan.jpg')}
               resizeMode="cover"
            />
         </View>
         <View>
            <Text style={styles.userText}>{userInfo.name}</Text>
         </View>
         <View>
            <Text style={styles.userEmailText}>{userInfo.email}</Text>
         </View>
         <View>
            <TouchableOpacity
               style={styles.logoutBtn}
               onPress={() => {
                  logout();
               }}
            >
               <Text style={styles.logoutBtnText}>Log out</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default ProfileScreen;

const styles = StyleSheet.create({
   container: {
      width,
      height,
      flex: 1,
      backgroundColor: COLORS.darkGray,
      alignItems: 'center',
      paddingTop: 100,
   },
   imageContainer: {
      width: 200,
      height: 200,
      borderRadius: 200,
      borderColor: COLORS.yellow,
      borderWidth: 5,
      overflow: 'hidden',
      marginVertical: 5,
   },
   image: {
      width: '100%',
      height: '100%',
   },
   userText: {
      fontFamily: 'DMBold',
      fontSize: 28,
      color: COLORS.infield,
   },
   userEmailText: {
      fontFamily: 'DMLight',
      fontSize: 16,
      color: COLORS.infield,
   },
   logoutBtn: {
      marginTop: 100,
      backgroundColor: COLORS.mediumGray,
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 8,
   },
   logoutBtnText: {
      color: COLORS.disable,
      fontSize: 16,
   },
});
// <View>
//    <Text className="text-red-500">Welcome back! {userInfo.name}</Text>
//    <Text className="text-red-500">User ID: {userInfo.id}</Text>
//    <TouchableOpacity
//       onPress={() => {
//          logout();
//       }}
//    >
//       <Text>Log out</Text>
//    </TouchableOpacity>
// </View>
