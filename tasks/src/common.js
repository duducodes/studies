import {Alert, Platform} from 'react-native'

const server = Platform.OS==='ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(error){
    Alert.alert('Ops! Tivemos um problema!',`Mensagem :${error}`)
}

export {server,showError}