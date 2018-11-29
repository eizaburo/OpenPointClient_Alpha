import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';


class Drawer extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 80 }}>
                <Button
                    title='サインアウト'
                    onPress={() => this.handleSignOut()}
                    buttonStyle={{ marginTop: 0 }}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
// export default Drawer;