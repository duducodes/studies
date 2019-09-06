import React  from 'react'
import { View,  StyleSheet } from 'react-native'
import Simples from './componentes/simples'
import Parimpar from './componentes/Parimpar'
import {Inverter, Megasena} from './componentes/Multi'

export default class App extends React.Component {
  render(){

    return (
       <View style={styles.container}>
         
         <Simples texto='Flexível !'/>
         <Parimpar numero={19} />
         <Inverter texto='React'/>
         <Megasena numeros={5 }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  f20 :{

    fontSize: 40
  }
});
