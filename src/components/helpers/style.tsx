import { StyleSheet } from "react-native";
import { CHARTS_CONTAINER_HEIGHT, SNAPSHOT_BOX_SIZE } from "./Constants";

export const chartStyles = StyleSheet.create({
    mainContainer: {
        zIndex: 1
    },
    chartsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 0,
        height: CHARTS_CONTAINER_HEIGHT,
        backgroundColor: '#fff'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
    },
    chartLabelText: {
        fontSize: 14,
        fontFamily: 'Sura-Bold',
        marginTop: 5,
        alignSelf: 'center'
    },
    procedureContainer: {
        margin: 10
    },
    originalArrayText: {
        fontFamily: 'Sura-Regular',
        fontSize: 18,
        letterSpacing: 2
    },
    swapingText: {
        fontSize: 17,
        fontFamily: 'Sura-Regular',
        marginTop: 5
    },
    legendContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 3,
        left: 3,
        height: 30,
        borderRightWidth: 0.6,
        borderBottomWidth: 0.6,
        alignItems: 'center'
    },
    legendTextContainer: {
        position: 'absolute',
        top: -30,
        left: 3
    },
    legendText: {
        fontSize: 16,
        fontFamily: 'Sura-Bold'
    },
    legendLabelText: {
        marginRight: 5,
        fontFamily: 'Sura-Regular',
    }
})
export const snapshotStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    stepButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        bottom: 10
    },
    snapshotContainer: {
        bottom: 30
    }
})
export const elementBoxStyles = StyleSheet.create({
    numberContainer: {
        width: SNAPSHOT_BOX_SIZE,
        height: SNAPSHOT_BOX_SIZE,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldedText: {
        fontFamily: 'Sura-Bold',
    }
})

export const timedSnapshotsStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    snapshotContainer: {
        bottom: 50
    }
})
export const theoryStyles = StyleSheet.create({
    theoryContainer: {
        margin: 10
    },
    generalTheory: {
        fontSize: 15,
        fontFamily: 'Sura-Regular'
    },
    complexityContainer: {
        padding: 5,
    },
    boldText: {
        fontFamily: 'Sura-Bold'
    },
    complexityText: {
        letterSpacing: 1.1,
    },
    codeExampleContainer: {
        marginTop: 5,
        borderWidth: 0.1,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 2,
    },
    codeExampleText: {
        letterSpacing: 1.3,
        fontSize: 15,
        fontFamily: 'Sura-Regular'
    },
    loopsOrCondition: {
        color: '#b22222'
    },
    functionName: {
        color: '#4b0082'
    },
    comment: {
        color: '#228b22',
        
    }
})