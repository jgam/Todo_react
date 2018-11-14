import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import {AppLoading} from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";


const {height, width} = Dimensions.get("window")

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false
  };
  componentDidMount = () => {
    this._loadToDos();
  }
  render() {
    const { newToDo} = this.state;
    const {loadedToDos} = this.state;
    if(!loadedToDos){
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}>감정한</Text>
        <View style={styles.card}>
          <TextInput style={styles.input}
                     placeholder={"New To Do"} 
                     value={newToDo} 
                     onChangeText={this._controlNewToDo}
                      placeholderTextColor={"#999"}
                     returnKeyType={"done"}
                     autoCorrect={false}
                     onSubmitEditing={this._addToDo}

                     />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I'm a To Do"}/>
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    })
  };
  _addToDo = () => {
    const {newToDo} = this.state;
    if(newToDo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState={
          ...prevState,
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return {...newState};
      });   
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center'
    //justifyContent: 'center',
  },
  title:{
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "400",
    marginBottom: 30
  },
  card:{
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderRadius: 10,
    marginBottom: 50,
    borderTopLeftRadius: 10,
    borderTopLeftRadius: 10,
    ...Platform.select({
      ios:{
        shadowColor:"rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});

//shadows are different for devices so we have to approach differently for shadow!
//as you can see the ...Platform sleect does the work
