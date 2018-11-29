import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class Forgot extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='パスワード忘れ'>
                    <FormLabel>Email</FormLabel>
                    <FormInput />
                    <FormValidationMessage>errors</FormValidationMessage>
                    <Button
                        title='リセットメールを送信'
                        onPress={() => this.handleForgot()}
                        buttonStyle={{ marginTop: 20 }}
                    />
                </Card>
            </View>
        );
    }

    //リセットメール送信ボタンを押したとき
    handleForgot = () => {
        alert('リセットメールを送信しました。')
    }
}

export default Forgot;