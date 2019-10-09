import React , { Component} from 'react'
import {StyleSheet,Text,View,ImageBackground, FlatList, TouchableOpacity, Platform, AsyncStorage} from 'react-native'
import  moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import  Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'
import axios from 'axios'
import {server,showError} from '../common'

export default class  Agenda extends Component {
    state = {
        tasks:[],
        visibleTasks : [],
        showDoneTask : true,
        showAddTask : false,
    }

    addTask =  async task =>{
       console.log(task.doneAt)
     try{
         await axios.post(`${server}/tasks` , {
             desc: task.desc,
             estimateAt:task.date
         })
        let tasks = [...this.state.tasks]
         tasks.push(task)
         this.setState({tasks})
         // showAddtask :false esconde a tela de modal
         this.setState({showAddTask :false},this.filterTasks)
     }catch(err){
        showError(err)
      }
    }
    deleteTask =  async id =>{
       try{
           await axios.delete(`${server}/tasks/${id}`)
           await this.loadTasks()
       }
       catch(err){
        showError(err)
        }
    }

    filterTasks =  () =>{
        let visibleTasks = null
        if(this.state.showDoneTask){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt ===null 
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
      
    }

    togleFilter = () =>{
        this.setState({showDoneTask : !this.state.showDoneTask},this.filterTasks)
    }

    componentDidMount= async () =>{
      this.loadTasks()
        
    }
    toogleTask = async id =>{
       try{
           await axios.put(`${server}/tasks/${id}/toggle`)
           await this.loadTasks()
       }catch(err){
           showError(err)
       }
    }

    loadTasks =  async() =>{
        try{ 
            const maxDate = moment().format('YYYY-MM-DD 23:59')
            const res =  await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: res.data},this.filterTasks)
        }catch (err) {
            showError(err)
        }
    }

    render(){
        return (
            <View style = {styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({ showAddTask: false })} />
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style = {styles.iconBar}>
                        <TouchableOpacity onPress={this.togleFilter}>
                            <Icon name={this.state.showDoneTask ?'eye' :'eye-slash'}
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks} 
                        keyExtractor = {item =>`${item.id}`}
                        renderItem ={({item}) =><Task {...item} onToggleTask = {this.toogleTask} onDelete={this.deleteTask}/>} 
                        />
                </View>
                <ActionButton buttonColor={commonStyles.colors.today}
                 onPress={() =>{this.setState({showAddTask:true})}}/>
            
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container :{ 
        flex :1,
    },
    background: {
        flex:3,
    },
    titleBar:{
        flex:1,
        justifyContent: 'flex-end',
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize:50,
        marginLeft:20,
        marginBottom:10,
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize:20,
        marginLeft:20,
        marginBottom:10,
    },
    taskContainer:{
        flex:7,
    },
    iconBar :{
        marginTop : Platform.OS ==='ios' ? 30: 10,
        marginHorizontal: 20,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
})