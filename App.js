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

//redux
import { Provider } from 'react-redux';
import createStore from './createStore';
import { connect } from 'react-redux';
import { updateUserData } from './actions/userAction';

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
        Home: { screen: createStackNavigator({ screen: Home }) },
        Profile: { screen: createStackNavigator({ screen: Profile }) },
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
        const signedIn =  this.props.state.userData.user.signedIn;

        if (signedIn) {
            return (<SignedInContainer />);
        } else {
            return (<SignedOutContainer />);
        }
    }
}
const mapStateToProps = state => ({ state: state });
const mapDispatchToProps = dispatch => ({ updateUserData: (user) => dispatch(updateUserData(user)) });
const SwitchLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(SwitchLayout);

const { store, persistor } = createStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SwitchLayoutContainer />
            </Provider>
        );
    }
}