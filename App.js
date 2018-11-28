import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Forgot from './screens/Forgot';
import Drawer from './screens/Drawer';


export default class App extends React.Component {
    render() {
        return (
            <Home />
        );
    }
}