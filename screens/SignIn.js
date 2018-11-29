import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

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
        this.props.navigation.navigate('SignedIn')
    }

    handleForgot = () => {
        this.props.navigation.navigate('Forgot')
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }
}

export default SignIn;