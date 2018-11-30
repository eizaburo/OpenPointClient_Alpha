import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

//formik
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

class ScanTop extends React.Component {

    state = {
        user_id_error: '',
        value_error: '',
    }

    render() {
        //store内に保存されたQRを取得
        const qr_data = this.props.state.qrData.qr.data;
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='QR読み取り'>
                    <Button
                        title='QRコードを読み取る'
                        onPress={() => this.handleReadQr()}
                        buttonStyle={{ margin: 0 }}
                        borderRadius={20}
                        icon={{ name: 'qrcode', type: 'font-awesome' }}
                        backgroundColor='#666666'
                    />
                </Card>
                <Formik
                    initialValues={{
                        user_id: '',
                        value: 0
                    }}
                    onSubmit={(values, x) => this.handlePlusValue(values, x)}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors }) => (
                            <Card title='サーバ連携'>
                                <FormLabel>操作対象</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    placeholder='0000000001'
                                    value={qr_data}
                                    editable={false}
                                />
                                <FormValidationMessage>{this.state.user_id_error}</FormValidationMessage>
                                <FormLabel>Value</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    placeholder='123'
                                    value={values.value.toString()}
                                    onChangeText={handleChange('value')}
                                    type='number'
                                />
                                <FormValidationMessage>{this.state.value_error}</FormValidationMessage>
                                <Button
                                    title='加算'
                                    onPress={() => this.handlePlusValue(values)}
                                    buttonStyle={{ marginTop: 20 }}
                                    borderRadius={20}
                                    icon={{ name: 'plus', type: 'font-awesome' }}
                                    backgroundColor='#FF3366'
                                />
                                <Button
                                    title='減算'
                                    onPress={() => this.handleMinusValue(values)}
                                    buttonStyle={{ marginTop: 30 }}
                                    borderRadius={20}
                                    icon={{ name: 'plus', type: 'font-awesome' }}
                                    backgroundColor='#6699CC'
                                />
                            </Card>
                        )
                    }
                </Formik>
            </View>
        );
    }

    handleReadQr = () => {
        this.props.updateQrData('');
        this.props.navigation.navigate('ScanCamera')
    }

    handlePlusValue = (values) => {
        const user_id = this.props.state.qrData.qr.data;
        const value = values.value;

        if (user_id === '' || value == 0) {
            alert('データが不正です。');
        } else {
            alert(user_id + ' add ' + value);
        }
    }

    handleMinusValue = (values) => {
        const user_id = this.props.state.qrData.qr.data;
        const value = values.value;

        if (user_id === '' || value == 0) {
            alert('データが不正です。');
        } else {
            alert(user_id + ' sub ' + value);
        }
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