import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { OrientationState } from '../../context/OrientationState';
import { getCodeExampleContainerWidth, getCodeExampleLeftPosition } from '../helpers/theoryGetters';
import {theoryStyles as styles} from '../helpers/style'
const MergeSort = (): JSX.Element => {
    const { orientation } = useContext(OrientationState);

    return (
        <View style={styles.theoryContainer}>
            <Text style={styles.generalTheory}>
                Like Quick Sort, Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
                The merge() function is used for merging two halves. The merge(arr, l, m, r) is a key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.
            </Text>
            <View style={styles.complexityContainer}>
                <Text style={styles.boldText}>Worst Time Complexity: O(nLog(n)). </Text>
                <Text style={styles.boldText}>Best Case Time Complexity: O(nLog(n)). </Text>
                <Text style={[styles.complexityText, styles.boldText]}>
                    Auxiliary Space: O(n)
                </Text>
            </View>
            <ScrollView style={[styles.codeExampleContainer, styles.shadow, {
                width: getCodeExampleContainerWidth(orientation),
                left: getCodeExampleLeftPosition(orientation)
            }]} horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>

                    <Text style={styles.codeExampleText}>
                        const<Text style={styles.functionName}> merge</Text>{` = (left, right) => {\n`}
                        {`     let sorted = [];\n`}
                        <Text style={styles.loopsOrCondition}>     while</Text>{`(left.length && right.length) {\n`}
                        <Text style={styles.loopsOrCondition}>          if</Text>{`(left[0] < right[0]) {\n`}
                        {`               sorted.`}<Text style={styles.loopsOrCondition}>push</Text>{`(left.`}<Text style={styles.loopsOrCondition}>shift</Text>{`());\n`}
                        {`          }\n`}
                        <Text style={styles.loopsOrCondition}>          else</Text>{'{\n'}
                        {`               sorted.`}<Text style={styles.loopsOrCondition}>push</Text>{`(right.`}<Text style={styles.loopsOrCondition}>shift</Text>{`());\n`}
                        {`          }\n`}
                        {`     }\n`}
                        {`     return sorted.`}<Text style={styles.loopsOrCondition}>concat</Text>{`(left.`}<Text style={styles.loopsOrCondition}>slice</Text>{`().`}<Text style={styles.loopsOrCondition}>concat</Text>{`(right.`}<Text style={styles.loopsOrCondition}>slice</Text>{`()));\n`}
                        {`}\n`}
                        const<Text style={styles.functionName}> mergeSort</Text>{`= (elements) => {\n`}
                        <Text style={styles.loopsOrCondition}>     if</Text>{`(elements.length <= 1) {\n`}
                        {`            return elements;\n`}
                        {`    }\n`}
                        {`    let mid = Math.`}<Text style={styles.loopsOrCondition}>floor</Text>{`(elements.length/2);\n`}
                        {`    let left = `}<Text style={styles.functionName}>mergeSort</Text>{`(elements.`}<Text style={styles.loopsOrCondition}>slice</Text>{`(0, mid));\n`}
                        {`    let right = `}<Text style={styles.functionName}>mergeSort</Text>{`(elements.`}<Text style={styles.loopsOrCondition}>slice</Text>{`(mid));\n`}
                        {`    return `}<Text style={styles.functionName}>merge</Text>{`(left, right);\n`}
                        {`}\n`}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default MergeSort;