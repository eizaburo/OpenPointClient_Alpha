import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';


class SignIn extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='サインイン'>
                    <FormLabel>Email</FormLabel>
                    <FormInput />
                    <FormValidationMessage>errors</FormValidationMessage>
                    <FormLabel>パスワード</FormLabel>
                    <FormInput />
                    <FormValidationMessage>errors</FormValidationMessage>
                    <Button
                        title='サインイン'
                        onPress={() => this.handleSignIn()}
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor='#0099FF'
                    />
                    <Button
                        title='パスワード忘れ'
                        onPress={() => this.handleForgot()}
                        buttonStyle={{ marginTop: 30 }}
                    />
                </Card>
                <Card title='サインアップ'>
                    <Button
                        title='サインアップ'
                        onPress={() => this.handleSignUp()}
                        buttonStyle={{ marginTop: 0 }}
                        backgroundColor='#CC9933'
                    />
                </Card>
            </View>
        );
    }

    handleSignIn = () => {
        user = {
            id: 99,
            name: 'hoge',
            email: 'hoge@hoge.com',
            signedIn: true,
        }
        this.props.updateUserData(user);
        this.props.navigation.navigate('SignedIn')
    }

    handleForgot = () => {
        this.props.navigation.navigate('Forgot')
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }
}

//redux
const mapStateToProps = state => (
    {
        state: state,
    }
);

const mapDispatchToProps = dispatch => (
    {
        updateUserData: (user) => dispatch(updateUserData(user)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
// export default SignIn;