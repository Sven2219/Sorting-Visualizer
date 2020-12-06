import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Splash = ({ navigation }: IProps): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Algorithms')
    }, 900)
    return () => {
      clearTimeout(timer)
    }
  }, []);
  //logo postavit
  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden />
    
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