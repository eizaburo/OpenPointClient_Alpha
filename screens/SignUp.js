import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';


class SignUp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='サインアップ'>
                    <FormLabel>名前</FormLabel>
                    <FormInput />
                    <FormValidationMessage>errors</FormValidationMessage>
                    <FormLabel>Email（サインインIDとなります）</FormLabel>
                    <FormInput />
                    <FormValidationMessage>errors</FormValidationMessage>
                    <FormLabel>パスワード</FormLabel>
                    <FormInput />
                    <FormValidationMessage>errors</FormValidationMessage>
                    <FormLabel>パスワード（確認）</FormLabel>
                    <FormInput />
                    <FormValidationMessage>errors</FormValidationMessage>
                    <Button
                        title='サインアップ'
                        onPress={() => this.handleSignUp()}
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor='#CC9933'
                    />
                </Card>
            </View>
        );
    }

    handleSignUp = () => {
        user = {
            id: 77,
            name: 'foo',
            email: 'foo@hoge.com',
            signedIn: true,
        }
        this.props.updateUserData(user);
        this.props.navigation.navigate('SignedIn')
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp;