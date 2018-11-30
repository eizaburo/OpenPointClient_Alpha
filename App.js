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
import Identiry from './screens/Identiry';
import ScanTop from './screens/ScanTop';
import ScanCamera from './screens/ScanCamera';

//Auth
import { isSignedIn } from './Auth';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';

//Scan
const ScanStack = createStackNavigator(
    {
        ScanTop: {
            screen: ScanTop,
            navigationOptions: ({ navigation }) => ({
                headerLeft: (
                    <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#fff' />
                ),
            })
        },
        ScanCamera: { screen: ScanCamera },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#0099FF',
            },
            headerTintColor: '#fff', // < Back ボタンの色変更
        }),
    }
);

//Tab
const HomeTab = createBottomTabNavigator(
    {
        Home: {
            screen: createStackNavigator({ screen: Home }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#fff' />
                    ),
                    headerStyle: {
                        backgroundColor: '#0099FF',
                    },
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />
            }
        },
        Identiry: {
            screen: createStackNavigator({ screen: Identiry }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#0099FF',
                    },
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#fff' />
                    ),
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="qrcode" color={tintColor} />
            }
        },
        Scan: {
            screen: ScanStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="camera" color={tintColor} />
            }
        },
        Profile: {
            screen: createStackNavigator({ screen: Profile }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#fff' />
                    ),
                    headerStyle: {
                        backgroundColor: '#0099FF',
                    },
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="user" color={tintColor} />
            }
        },
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: '#0099FF',
            },
            inactiveTintColor: '#bbb',
            activeTintColor: '#fff',
        }
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
        SignIn: {
            screen: SignIn,
            navigationOptions: () => ({
                title: 'OpenPoint Client'
            })
        },
        SignUp: { screen: SignUp },
        Forgot: { screen: Forgot }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#0099FF',
            },
            headerTintColor: '#fff', // < Back ボタンの色変更
        },
    }
);

//Switch
const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: { screen: SignedIn },
            SignedOut: { screen: SignedOut },
        },
        {
            initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
        }
    );
}

const { store, persistor } = createStore();

export default class App extends React.Component {

    state = {
        signedIn: false,
        checkSignedIn: false,
    }

    async componentDidMount() {
        try {
            const res = await isSignedIn();
            this.setState({
                signedIn: res.signedIn,
                checkSignedIn: true,
            });
        } catch (errror) {
            console.log(error);
        }
    }

    render() {
        const { checkSignedIn, signedIn } = this.state;
        if (!checkSignedIn) return null;
        const Layout = createAppContainer(createRootNavigator(signedIn));
        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}