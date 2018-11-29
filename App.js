import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Navigation
import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator,
    DrawerItems,
    createAppContainer
} from 'react-navigation';

//各Component読み込み
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Forgot from './screens/Forgot';
import Drawer from './screens/Drawer';

//Tab
const HomeTab = createBottomTabNavigator(
    {
        Home: { screen: Home },
        Profile: { screen: Profile },
    }
);

//SignedIn
const SignedIn = createDrawerNavigator(
    {
        Home: { screen: HomeTab },
    },
    {
        contentComponent: Drawer,
    }
);

//SignedOut
const SignedOut = createStackNavigator(
    {
        SignIn: { screen: SignIn },
        SignUp: { screen: SignUp },
        Forgot: { screen: Forgot }
    }
);

//SwitchLayout
class SwitchLayout extends React.Component {
    render() {
        const SignedInContainer = createAppContainer(SignedIn);
        const SignedOutContainer = createAppContainer(SignedOut);

        //ここのtrue/falseを切り替えて手動で切り替えテスト
        const signedIn = false;

        if (signedIn) {
            return (<SignedInContainer />);
        } else {
            return (<SignedOutContainer />);
        }
    }
}

export default class App extends React.Component {
    render() {
        return (
            <SwitchLayout />
        );
    }
}