import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';
import { updateNavData } from '../actions/navAction';

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <BarCodeScanner
                    onBarCodeRead={this.handleBarCodeScanned}
                    style={{ height: 300, width: 300 }}
                />
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.props.updateQrData(data);
        this.props.updateNavData('ScanTop') //移動元を記憶
        // this.props.navigation.navigate('ScanTop');←storeをupdateしたタイミングでHomeに行っています。。。
        //仕方がないので、Home側で移動元をpageとして受け取り、移動元がScanTopなら、そちらへリダイレクトするようにする。暫定策。
        //サインアウト時にpagevパラメータも消去する
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
        updateNavData: (page) => dispatch(updateNavData(page)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ScanCamera);
// export default ScanCamera;