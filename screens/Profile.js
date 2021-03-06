import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

//Auth
import { onSignOut } from '../Auth';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <ScrollView>
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
                            value={String(this.props.state.userData.user.signedIn)}
                            editable={false}
                        />
                    </Card>
                    <Card title='サインアウト'>
                        <Button
                            title='サインアウト'
                            onPress={() => this.handleSignOut()}
                            buttonStyle={{ marginTop: 0 }}
                            icon={{ name: 'sign-out', type: 'font-awesome' }}
                            borderRadius={20}
                        />
                    </Card>
                </ScrollView>
            </View>
        );
    }

    handleSignOut = async () => {
        user = {
            id: 0,
            name: '',
            email: '',
            signedIn: false,
        }
        this.props.updateUserData(user);
        this.props.updateQrData('');
        //サインアウト
        try {
            await onSignOut();
        } catch (error) {
            console.log(error);
        }
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
        updateQrData: (data) => dispatch(updateQrData(data)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default Profile;