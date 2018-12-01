import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//barcode
import QRCode from 'react-native-qrcode';
import Barcode from 'react-native-barcode-builder';

class Identity extends React.Component {
    render() {
        const id = this.props.state.userData.user.id;
        const code = ('0000000000' + id).slice(-10);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                <Text>Identity</Text>
                <Text>{code}</Text>
                <View>
                    <QRCode
                        value={code}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                    />
                </View>
                <View style={{ marginTop: 80 }}>
                    <Barcode
                        value={code}
                        format="CODE128"
                        height={50}
                        text={code}
                        lineColor='#888888'
                    />
                </View>
            </View>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(Identity);
// export default Identity; 