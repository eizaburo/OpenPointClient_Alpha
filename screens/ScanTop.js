import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

//formik
import { Formik, yupToFormErrors, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';

class ScanTop extends React.Component {
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
                        value: 0,
                        // operation: '',
                    }}
                    onSubmit={(values) => { this.handlePlusValue(values) }}
                    validationSchema={Yup.object().shape({
                        //reduxの値は直接valuesとして評価できないのでthis.props.stateの値を利用して間接的に処理する
                        user_id: Yup
                            .string()
                            .test('check-user_id', 'ユーザーIDがおかしいようです。', (value) => {
                                //正規表現
                                const reg = new RegExp('[0-9]{8}')
                                //redux利用なので、valueを利用せず、redux store内の値を利用する
                                if (reg.test(qr_data) === true) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }),
                        value: Yup
                            .string()
                            .matches(/^[1-9][0-9]{0,2}$/,'1以上999以下の半角数字を入力してください。')
                            .required('この項目は必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, setValues }) => (
                            <Card title='サーバ連携'>
                                <FormLabel>ユーザーID（操作対象）</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    placeholder='0000000001'
                                    value={qr_data}
                                    editable={false}
                                />
                                <FormValidationMessage>{errors.user_id}</FormValidationMessage>
                                <FormLabel>Value</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    placeholder='123'
                                    value={values.value.toString()}
                                    onChangeText={handleChange('value')}
                                    type='number'
                                />
                                <FormValidationMessage>{errors.value}</FormValidationMessage>
                                <Button
                                    title='加算'
                                    onPress={() => {
                                        //operation flag情報をvaluesに追加
                                        //setValuesを引数に追加すること
                                        let newValues = values;
                                        newValues.operation = 'ADD';
                                        setValues(newValues);
                                        //submit
                                        handleSubmit();
                                    }}
                                    buttonStyle={{ marginTop: 20 }}
                                    borderRadius={20}
                                    icon={{ name: 'plus', type: 'font-awesome' }}
                                    backgroundColor='#FF3366'
                                />
                                <Button
                                    title='減算'
                                    onPress={() => {
                                        //operation flag情報をセット
                                        let newValues = values;
                                        newValues.operation = 'SUB';
                                        setValues(newValues);
                                        //submit
                                        handleSubmit();
                                    }}
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
        //値の取得
        const user_id = this.props.state.qrData.qr.data;
        const value = values.value;
        const operation = values.operation;

        //とりあえず表示
        alert(user_id + ' ' + value + ' ' + operation);
    }

    handleMinusValue = (values) => {
        //値の取得
        const user_id = this.props.state.qrData.qr.data;
        const value = values.value;
        const operation = values.operation;

        //とりあえず表示
        alert(user_id + ' ' + value + ' ' + operation);
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