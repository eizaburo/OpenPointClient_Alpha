import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//formik
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

//Devlig
import * as Devlib from '../Devlib';

class Forgot extends React.Component {

    state = {
        spinner: false,
    }
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    onSubmit={(values) => this.handleForgot(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup
                            .string()
                            .email('Emailの形式ではないようです。')
                            .required('Emailの入力は必須です。')
                            .test('check-email-exist', '該当のメールがありません。', (value) => {
                                if (value === 'test@test.com') {
                                    return false;
                                } else {
                                    return true;
                                }
                            }),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
                            <Card title='パスワード忘れ'>
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    placeholder={'reset@bluecode.jp'}
                                />
                                {touched.email && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                <Button
                                    title='リセットメールを送信'
                                    onPress={handleSubmit}
                                    buttonStyle={{ marginTop: 20 }}
                                    loading={this.state.spinner}
                                    icon={{ name: 'envelope', type: 'font-awesome' }}
                                    borderRadius={20}
                                />
                            </Card>
                        )
                    }
                </Formik>
            </View>
        );
    }

    //リセットメール送信ボタンを押したとき
    handleForgot = async (values) => {

        //spinner on
        this.setState({ spinner: true });

        //sleep（非同期処理）
        await Devlib.sleep(1500);

        // //spinner off
        this.setState({ spinner: false });

        alert('リセットメールを送信しました。')
    }
}

export default Forgot;