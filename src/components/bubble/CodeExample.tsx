import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CODE_EXAMPLE_CONTAINER_WIDTH, width } from './Constants';


const CodeExample = (): JSX.Element => {
    return (<View style={[styles.codeExampleContainer, styles.shadow]}>
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
    </View>)
}

const styles = StyleSheet.create({
    codeExampleContainer: {
        width: CODE_EXAMPLE_CONTAINER_WIDTH,
        alignItems: 'center',
        left: (width - CODE_EXAMPLE_CONTAINER_WIDTH) / 2,
        marginBottom:5,
        borderWidth:0.1,
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
    comment:{
        color:'#228b22',
        left:-35
    }
})
export default CodeExample;