import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CODE_EXAMPLE_CONTAINER_WIDTH, width } from '../Constants';

const QuickTheroy = () => {
    return (
        <View style={styles.theoryContainer}>
            <Text style={styles.inGeneralText}>
                Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot..
                    </Text>
            <View style={{ padding: 5 }}>
                <Text style={styles.complexityText}>
                    <Text style={{ fontFamily: 'Sura-Bold' }}>Worst Time Complexity:
                            O(n*n).</Text>The worst case occurs when the partition process always picks greatest or smallest element as pivot.
                        </Text>
                <Text style={styles.complexityText}>
                    <Text style={{ fontFamily: 'Sura-Bold' }}>Best Case Time Complexity: O(nLog(n)).</Text>
                            The best case occurs when the partition process always picks the middle element as pivot. Following is recurrence for best case.
                        </Text>
                <Text style={[styles.complexityText, { fontFamily: 'Sura-Bold' }]}>
                    Auxiliary Space: O(1)
                </Text>
            </View>
            <ScrollView style={[styles.codeExampleContainer, styles.shadow]} horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.comment}>{`\\\\Always pick last element as pivot`}</Text>
                    <Text style={styles.codeExampleText}>
                        const<Text style={styles.functionName}> partition</Text>{` = (elements, low, high) => {\n`}
                        {`     const pivot = elements[high];\n`}
                        {`     let i = (low-1);\n`}
                        <Text style={styles.loopsOrCondition}>     for</Text>{`(let j = 0; j < high; j++) {\n`}
                        <Text style={styles.loopsOrCondition}>          if</Text>{`(elements[j] < pivot) {\n`}
                        {`               let temp = elements[i+1];\n`}
                        {`               elements[i+1] = elements[high] ;\n`}
                        {`               elements[high] = temp;\n`}
                        {`          }\n`}
                        {`     }\n`}
                        {`     let temp = elements[i+1];\n`}
                        {`     elements[i+1] = elements[high];\n`}
                        {`     elements[high] = temp;\n`}
                        {`     return i+1;\n`}
                        {`}\n`}
                        const<Text style={styles.functionName}> quickSort</Text>{`= (elements, low, high) => {\n`}
                        <Text style={styles.loopsOrCondition}>     if</Text>{`(low < high) {\n`}
                        {`              let pivotPosition = `}<Text style={styles.functionName}>partition</Text>{`(elements, low, high);\n`}
                        <Text style={styles.functionName}>              quickSort</Text>{`(elements, low, pivotPostion-1);\n`}
                        <Text style={styles.functionName}>              quickSort</Text>{`(elements, pivotPostion+1, high);\n`}
                        {`     }\n`}
                        {`}\n`}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    theoryContainer: {
        margin: 10
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
        left: -115
    }
})
export default QuickTheroy;