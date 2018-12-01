import React from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

//formik
import { Formik, yupToFormErrors, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';

//Devlig
import * as Devlib from '../Devlib';

class ScanTop extends React.Component {

    state = {
        add_spinner: false,
        sub_spinner: false,
        add_disabled: false,
        sub_disabled: false,
    }

    render() {
        //store内に保存されたQRを取得
        const qr_data = this.props.state.qrData.qr.data;
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView>
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
                            onSubmit={(values) => { this.handleValue(values) }}
                            validationSchema={Yup.object().shape({
                                //reduxの値は直接valuesとして評価できないのでthis.props.stateの値を利用して間接的に処理する
                                user_id: Yup
                                    .string()
                                    .test('check-user_id', 'IDがおかしいようです。QRを読み取ってください。', (value) => {
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
                                    .matches(/^[1-9][0-9]{0,2}$/, '1以上999以下の半角数字を入力してください。')
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
                                                //後々使うのでoperationとuser_idをvaluesに追加
                                                let newValues = values;
                                                newValues.operation = 'ADD';
                                                newValues.user_id = qr_data;
                                                setValues(newValues);
                                                //submit
                                                handleSubmit();
                                            }}
                                            buttonStyle={{ marginTop: 20 }}
                                            borderRadius={20}
                                            icon={{ name: 'plus', type: 'font-awesome' }}
                                            backgroundColor='#FF3366'
                                            loading={this.state.add_spinner}
                                            disabled={this.state.add_disabled}

                                        />
                                        <Button
                                            title='減算'
                                            onPress={() => {
                                                //operation flag情報をセット
                                                let newValues = values;
                                                newValues.operation = 'SUB';
                                                newValues.user_id = qr_data;
                                                setValues(newValues);
                                                //submit
                                                handleSubmit();
                                            }}
                                            buttonStyle={{ marginTop: 30 }}
                                            borderRadius={20}
                                            icon={{ name: 'plus', type: 'font-awesome' }}
                                            backgroundColor='#6699CC'
                                            loading={this.state.sub_spinner}
                                            disabled={this.state.sub_disabled}
                                        />
                                    </Card>
                                )
                            }
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }

    handleReadQr = () => {
        this.props.updateQrData('');
        this.props.navigation.navigate('ScanCamera')
    }

    //onSubmit valuesにセットされたoperationによりタスクを分岐
    handleValue = (values) => {
        if (values.operation === 'ADD') {
            this.handleAddValue(values);
        } else {
            this.handleSubValue(values);
        }
    }

    //ADD時の処理
    handleAddValue = (values) => {
        //値の取得
        const user_id = this.props.state.qrData.qr.data;
        const value = values.value;
        const operation = values.operation;
        //コンファーム＋実行
        this.showConfirmAlertForAdd(values);
    }

    //SUB時の処理
    handleSubValue = (values) => {
        //値の取得
        const user_id = this.props.state.qrData.qr.data;
        const value = values.value;
        const operation = values.operation;
        //コンファーム＋実行
        this.showConfirmAlertForSub(values)
    }

    //加算用のコンファーム
    showConfirmAlertForAdd = (values) => {
        Alert.alert(
            '加算処理',
            '本当に処理を行うか確認してください。',
            [
                { text: 'キャンセル', onPress: () => this.handleCancelForAdd(values), style: 'cancel' },
                { text: '加算処理', onPress: () => this.handleExecForAdd(values), style: 'destructive' }, //onPress直後の()にvaluesを入れない
            ]
        );
    }

    //減算用のコンファーム
    showConfirmAlertForSub = (values) => {
        Alert.alert(
            '減算確認',
            '本当に処理を行うか確認してください。',
            [
                { text: 'キャンセル', onPress: () => this.handleCancelForSub(values), style: 'cancel' },
                { text: '減算処理', onPress: () => this.handleExecForSub(values), style: 'destructive' },

            ],
            { cancelable: false }
        );
    }

    //キャンセル処理（加算）
    handleCancelForAdd = (values) => {
    }

    //キャンセル処理（減算）
    handleCancelForSub = (values) => {
    }

    //加算処理
    handleExecForAdd = async (values) => {

        this.setState({ add_disabled: true });
        this.setState({ add_spinner: true });

        await Devlib.sleep(1500);

        this.setState({ add_spinner: false });
        this.setState({ add_disabled: false });


        //実際はサーバ連携処理を書く
        const msg = values.user_id + 'に' + values.value + 'Value ' + values.operation + 'しました。';
        alert(msg);

    }

    //減算処理
    handleExecForSub = async (values) => {

        this.setState({ sub_disabled: true });
        this.setState({ sub_spinner: true });

        await Devlib.sleep(1500);

        this.setState({ sub_spinner: false });
        this.setState({ sub_disabled: false });

        //実際はサーバ連携処理を書く
        const msg = values.user_id + 'に' + values.value + 'Value ' + values.operation + 'しました。';
        alert(msg);
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