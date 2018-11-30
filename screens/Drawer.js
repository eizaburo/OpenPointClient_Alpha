import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

//Auth
import { onSignOut } from '../Auth';

class Drawer extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 80 }}>
                <Button
                    title='サインアウト'
                    onPress={() => this.handleSignOut()}
                    buttonStyle={{ marginTop: 0 }}
                    icon={{name: 'sign-out', type: 'font-awesome'}} 
                    borderRadius={20}
                />
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
        //移動
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


export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
// export default Drawer;