import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CODE_EXAMPLE_CONTAINER_WIDTH, width } from './Constants';

const BubbleTheory = () => {
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
            <View style={[styles.codeExampleContainer, styles.shadow]}>
                <Text style={styles.comment}>{`\\\\ An optimized version of Bubble Sort `}</Text>
                <Text style={styles.codeExampleText}>
                    const<Text style={styles.functionName}> bubbleSort</Text>{`=(elements)=> {\n`}
                    {`     const length = elements.length;\n`}
                    <Text style={styles.loopsOrCondition}>     for</Text>{`(let i = 0; i < length; i++) {\n`}
                    <Text style={styles.loopsOrCondition}>          for</Text>{`(let j = 0; j < length - i - 1; j++) {\n`}
                    <Text style={styles.loopsOrCondition}>               if</Text>{`(elements[j] > elements[j+1]) {\n`}
                    {`                    let temp = elements[j];\n`}
                    {`                    elements[j] = elements[j+1] ;\n`}
                    {`                    elements[j+1] = temp;\n`}
                    {`               }\n`}
                    {`          }\n`}
                    {`     }\n`}
                    {`}\n`}
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
    },
    codeExampleContainer: {
        width: CODE_EXAMPLE_CONTAINER_WIDTH,
        alignItems: 'center',
        left: (width - CODE_EXAMPLE_CONTAINER_WIDTH) / 8,
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
        left: -35
    }
})
export default BubbleTheory;