import React from 'react'
import { StyleSheet, Text ,Dimensions, TouchableHighlight} from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize : 40,
        height: Dimensions.get('window').width /4,
        width : Dimensions.get('window').width/4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign : 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    operatorButton : {
        color:'#fff',
        backgroundColor: '#fa8231',
    },
    buttonDouble :{
        width:( Dimensions.get('window').width /4) *2
    },
    buttonTrilpe :{
        width:( Dimensions.get('window').width /4) *3
    },
})

export default props => {
    const stylesButton = [styles.button]
    if(props.double) stylesButton.push(styles.buttonDouble)
    if(props.triple) stylesButton.push(styles.buttonTrilpe)
    if(props.operation) stylesButton.push(styles.operatorButton)
    return (
        <TouchableHighlight onPress={props.onClick} >
            <Text style={stylesButton}>{props.value}</Text>
        </TouchableHighlight>
    )
}