import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './src/home/home';
import Question from './src/question/question';
import User from './src/user/user';

const HomeStack = StackNavigator({
  Home: { screen: Home },
  Question: { screen: Question }
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

const UserStack = StackNavigator({
  User: { screen: User }
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

const MainNavigator = TabNavigator({
  Home: {
    screen: HomeStack,
  },
  User: {
    screen: UserStack,
  }
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'User') {
          iconName = 'user';
        }
        return <Icon name={iconName} size={ 25 } color={tintColor} />;
    }
  }),
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: '#e91e63',
  },
});

export default class CUAsking extends React.Component {
  render() {
    return (
      <MainNavigator/>
    );
  }
}
