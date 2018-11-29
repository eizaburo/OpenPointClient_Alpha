import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//formik
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

class Forgot extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    onSubmit={(values) => this.handleForgot(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Emailの形式ではないようです。').required('Emailの入力は必須です。'),
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
                                />
                                {touched.email && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                <Button
                                    title='リセットメールを送信'
                                    onPress={handleSubmit}
                                    buttonStyle={{ marginTop: 20 }}
                                />
                            </Card>
                        )
                    }
                </Formik>
            </View>
        );
    }

    //リセットメール送信ボタンを押したとき
    handleForgot = (values) => {
        alert('リセットメールを送信しました。')
    }
}

export default Forgot;