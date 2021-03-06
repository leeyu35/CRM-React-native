/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase'
import {Provider} from 'react-redux'
import {createStore } from 'redux'
import Login from './login'
import PeopleList from './PeopleList'
import Loader from './loader'
import reducers from '../reducers/PeopleReducer'

const store = createStore(reducers)

export default class App extends Component {
  state = {
    loggedIn : null
  }
    componentWillMount(){
        firebase.initializeApp({
            apiKey: "API KEY",
            authDomain: "DOMAIN",
            databaseURL: "https://db.firebaseio.com",
            projectId: "pid",
            storageBucket: "sb.appspot.com",
            messagingSenderId: "sid"
        })

        firebase.auth().onAuthStateChanged((user) => {
          if(user){
            this.setState({loggedIn: true})
          }else{
            this.setState({loggedIn: false})
          }
        })
    }
   renderInitialView(){
     switch (this.state.loggedIn){
       case true:
          return <PeopleList />
       case false:
          return <Login />
        default:
          return <Loader size="large" />
     }
   } 

  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>

        {this.renderInitialView()}
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});