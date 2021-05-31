import React, {useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Actions, IState, reducer} from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';
import Theory from '../components/theory/Theory';
import {
  BUBBLE_SORT,
  CHARTS,
  MANUAL,
  SNAPSHOTS,
  TIMING,
} from '../components/helpers/types';
import Menu from '../components/menu/Menu';
import {AlgorithmsDispatch} from '../context/AlgorithmsDispatch';
import {AlgorithmsState} from '../context/AlgorithmsState';
import Vizualization from '../components/visualization/Visualization';
import VizualizationManagment from '../components/visualization/managment/VisualizationManagment';
import SnapshotSettings from '../components/SnapshotSettings';
import {SETTINGS_ICON_SIZE} from '../components/helpers/Constants';
import UserSettings from '../components/visualization/UserSettings';
const ICON_SIZE = 50;

const Algorithms = (): JSX.Element => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(
    reducer,
    {
      isVisualizationPaused: true,
      sortingAlgorithm: BUBBLE_SORT,
      isMenuModalOpen: false,
      isTheoryModalOpen: false,
      arrayForSort: '',
      timerValue: 700,
      isVisualizationFinished: true,
      visualizationMethod: CHARTS,
      snapshotDisplayMethod: MANUAL,
      isUserSettingsOpen: false,
      bubbleSortProcedure: {indexes: [], procedure: []},
      mergeSortSnapshotsProcedure: {levels: [], snapshots: []},
      quickSortProcedureCharts: {indexes: [], procedure: [], pivotIndexes: []},
      quickSortSnapshotsProcedure: {
        snapshots: [],
        pivotIndexes: [],
        snapshotPosition: {levels: [], startIndexes: []},
      },
    },
  );

  const getMenuIcon = (): JSX.Element => {
    if (state.isVisualizationFinished) {
      return (
        <Ionicons
          name="menu"
          size={35}
          color="#000"
          onPress={() => dispatch({type: 'setIsMenuModalOpen', payload: true})}
        />
      );
    }
    return <Ionicons name="menu" size={35} color="#d3d3d3" />;
  };

  const openSettings = React.useCallback(() => {
    dispatch({type: 'setIsUserSettingsOpen', payload: true});
  }, []);

  const closeSettings = React.useCallback(() => {
    dispatch({type: 'setIsUserSettingsOpen', payload: false});
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          {getMenuIcon()}
          <Text style={styles.headerText}>{state.sortingAlgorithm}</Text>
          <Feather
            name="book"
            size={35}
            color="#000"
            onPress={() =>
              dispatch({type: 'setIsTheoryModalOpen', payload: true})
            }
          />
        </View>
        <InputArray
          arrayForSort={state.arrayForSort}
          onPress={(arrayForSort: string) =>
            dispatch({type: 'setArrayForSort', payload: arrayForSort})
          }
          editable={state.isVisualizationFinished}
        />
        <AlgorithmsDispatch.Provider value={{dispatch}}>
          <AlgorithmsState.Provider value={{state}}>
            <VizualizationManagment />
          </AlgorithmsState.Provider>
        </AlgorithmsDispatch.Provider>
        <AlgorithmsDispatch.Provider value={{dispatch}}>
          <AlgorithmsState.Provider value={{state}}>
            <Vizualization />
          </AlgorithmsState.Provider>
        </AlgorithmsDispatch.Provider>
        {state.isMenuModalOpen && (
          <AlgorithmsDispatch.Provider value={{dispatch}}>
            <AlgorithmsState.Provider value={{state}}>
              <Menu />
            </AlgorithmsState.Provider>
          </AlgorithmsDispatch.Provider>
        )}
        {state.isTheoryModalOpen && (
          <Theory
            onPress={() =>
              dispatch({type: 'setIsTheoryModalOpen', payload: false})
            }
            chosenSort={state.sortingAlgorithm}
          />
        )}
      </ScrollView>
      {state.visualizationMethod === SNAPSHOTS &&
        state.isVisualizationFinished && (
          <SnapshotSettings
            manualMethod={() =>
              dispatch({type: 'setSnapshotDisplayMethod', payload: MANUAL})
            }
            snapshotVisualizationMethod={state.snapshotDisplayMethod}
            timingMethod={() =>
              dispatch({type: 'setSnapshotDisplayMethod', payload: TIMING})
            }
          />
        )}
      {state.visualizationMethod === CHARTS && state.isVisualizationFinished && (
        <TouchableOpacity
          style={styles.settingsContainer}
          onPress={openSettings}>
          <Ionicons name="md-settings-outline" size={SETTINGS_ICON_SIZE} />
        </TouchableOpacity>
      )}
      {state.isUserSettingsOpen ? (
        <UserSettings
          timerValue={state.timerValue}
          saveTimer={(value: number) =>
            dispatch({type: 'setTimerValue', payload: value})
          }
          closeSettings={closeSettings}
          saveArray={(value) =>
            dispatch({type: 'setArrayForSort', payload: value})
          }
          arrayForSort={state.arrayForSort}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Sura-Bold',
    letterSpacing: 2,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  buttonContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    right: ICON_SIZE / 2 - 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPosition: {
    alignItems: 'flex-end',
    top: ICON_SIZE / 2,
    zIndex: 2,
    justifyContent: 'space-between',
  },
  settingsContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
});
export default Algorithms;
