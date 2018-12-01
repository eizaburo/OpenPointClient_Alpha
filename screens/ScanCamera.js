import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

//expo for readBarcode
import { BarCodeScanner, Permissions } from 'expo';

class ScanCamera extends React.Component {

    state = {
        hasCameraPermission: null,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }


    render() {

        const { hasCameraPermission } = this.state;

        //OKを待つ間
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>
        }

        //不許可の場合
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <BarCodeScanner
                    onBarCodeRead={this.handleBarCodeScanned}
                    style={{ height: 300, width: 300 }}
                />
                <Button
                    title='読み取りシミュレートボタン（テスト用）'
                    onPress={() => this.handleBarCodeScanned({ type: 'QR', data: '88888888' })}
                    buttonStyle={{ marginTop: 20 }}
                    borderRadius={20}
                />
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.props.updateQrData(data);
        this.props.navigation.navigate('ScanTop');
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanCamera);
// export default ScanCamera;