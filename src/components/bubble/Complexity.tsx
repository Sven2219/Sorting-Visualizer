import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Complexity = () => {
    return (
        <View style={styles.theoryContainer}>
            <Text style={styles.inGeneralText}>
                Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping
                the adjacent elements if they are in wrong order.
                    </Text>
            <View style={{ padding: 5 }}>
                <Text style={styles.complexityText}>
                    <Text style={{ fontFamily: 'Sura-Bold' }}>Worst and Average Case Time Complexity:
                            O(n*n).</Text> Worst case occurs when array is reverse sorted.
                        </Text>
                <Text style={styles.complexityText}>
                    <Text style={{ fontFamily: 'Sura-Bold' }}>Best Case Time Complexity: O(n).</Text>
                            Best case occurs when array is already sorted.
                        </Text>
                <Text style={[styles.complexityText, { fontFamily: 'Sura-Bold' }]}>
                    Auxiliary Space: O(1)
                        </Text>
                <Text style={styles.complexityText}>
                    <Text style={{ fontFamily: 'Sura-Bold' }}>Boundary Cases: </Text>Bubble sort takes minimum time (Order of n) when elements are already sorted.
                        </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    theoryContainer: {
        margin: 15
    },
    inGeneralText: {
        fontSize: 15,

        fontFamily: 'Sura-Regular'
    },
    complexityText: {
        marginTop: 10,
        letterSpacing: 1.1,
    }
})
export default Complexity;