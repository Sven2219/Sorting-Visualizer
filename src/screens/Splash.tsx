import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const { width, height } = Dimensions.get("window")
const Splash = ({ navigation }: IProps): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Algorithms')
    }, 900)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden />
      <Image source={require('../images/SplashScreen.jpg')} style={{ resizeMode: 'center', width, height }} />
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
})
export default Splash;