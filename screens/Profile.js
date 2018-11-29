import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';


class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='ユーザー情報'>
                    <FormLabel>ID</FormLabel>
                    <FormInput
                        value={this.props.state.userData.user.id.toString()}
                        editable={false}
                    />
                    <FormLabel>名前</FormLabel>
                    <FormInput
                        value={this.props.state.userData.user.name}
                        editable={false}
                    />
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        value={this.props.state.userData.user.email}
                        editable={false}
                    />
                    <FormLabel>サインイン</FormLabel>
                    <FormInput
                        value={this.props.state.userData.user.signedIn.toString()}
                        editable={false}
                    />
                </Card>
                <Card title='サインアウト'>
                    <Button
                        title='サインアウト'
                        onPress={() => this.handleSignOut()}
                        buttonStyle={{ marginTop: 0 }}
                        icon={{name: 'sign-out', type: 'font-awesome'}} 
                        borderRadius={20}
                    />
                </Card>
            </View>
        );
    }

    handleSignOut = () => {
        user = {
            id: 0,
            name: '',
            email: '',
            signedIn: false,
        }
        this.props.updateUserData(user);
        this.props.navigation.navigate('SignedOut');
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default Profile;