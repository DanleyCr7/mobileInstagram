import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { Image } from 'react-native';



import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';
export default createAppContainer(
  createStackNavigator({
    Feed,
    New,
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#000',
      headerBackTitle: null,
      headerTitle: <Image style={{ marginHorizontal: 130 }} source={logo} />

    },
    mode: 'modal'
  })
)