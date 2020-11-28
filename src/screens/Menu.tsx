import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import SortingType from '../components/menu/SortingType';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Menu = ({ navigation }: IProps): JSX.Element => {

  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Menu</Text>
      </View>

      <View style={styles.sortingContainer}>
        <SortingType onPress={() => navigation.navigate('MergeSort')} sortingType="Merge Sort" />
        <SortingType onPress={() => navigation.navigate('QuickSort')} sortingType="Quick Sort" />
        <SortingType onPress={() => navigation.navigate('BubbleSort')} sortingType="Bubble Sort" />
        <SortingType onPress={() => navigation.navigate('HeapSort')} sortingType="Heap Sort" />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Sura-Bold',
    letterSpacing: 2
  },
  sortingContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
    alignItems: 'center'
  }

})
export default Menu;