import React from 'react'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import Agenda from './screens/Angeda'
import Auth from './screens/Auth'

const MainRoutes = createSwitchNavigator({
    Auth:{
        
        screen: Auth
    },
    Home :{
        
        screen: Agenda
    }
})

const App = createAppContainer(MainRoutes)

export default App
