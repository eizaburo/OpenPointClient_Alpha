import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

class ScanTop extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>ScanTop</Text>
                <Text>Data: {this.props.state.qrData.qr.data}</Text>
                <Button
                    title='QRコードを読み取る'
                    onPress={() => this.handleReadQr()}
                    buttonStyle={{ marginTop: 20 }}
                    borderRadius={20}
                    icon={{ name: 'qrcode', type: 'font-awesome' }}
                />
            </View>
        );
    }

    handleReadQr = () => {
        this.props.updateQrData('');
        this.props.navigation.navigate('ScanCamera')
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanTop);
// export default ScanTop;