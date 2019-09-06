import React from 'react'
import {createDrawerNavigator} from 'react-navigation'
import Simples from './componentes/simples'
import Parimpar from './componentes/Parimpar'
import {Inverter, Megasena} from './componentes/Multi'
import Contador from './componentes/Contador'

export default createDrawerNavigator({

  Contador :{
    screen: () => <Contador numero={8} />
  },
  Megasena : {
      screen: () => <Megasena  numeros={8} />,
      navigationOptions :{title :'Mega sena'}
  },
  Inverter : {
    screen: () => <Inverter texto='React' />
    
  },
  Parimpar : {
      screen: () => <Parimpar numero={30}/>,
      navigationOptions : {title : 'Par & Impar'}
  },
  Simples : {
      screen : () =><Simples texto='Flexivel!!!' />
  }


}, {drawerWidth : 300})