import React from 'react'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import Agenda from './screens/Angeda'
import Auth from './screens/Auth'

const MainRoutes = createSwitchNavigator({
    Auth:{
        name:'Auth',
        screen: Auth
    },
    Home :{
        name:'Home',
        screen: Agenda
    }
})

const App = createAppContainer(MainRoutes)

export default App
