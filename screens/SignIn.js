import React from 'react';
import { View, Text } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//formik
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

//Devlig
import * as Devlib from '../Devlib';

class SignIn extends React.Component {

    state = {
        spinner: false,
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Formik
                    initialValues={{
                        email: 'test@test.com',
                        password: 'testtes'
                    }}
                    onSubmit={(values, { setSubmitting }) => this.handleSignIn(values, { setSubmitting })}
                    validationSchema={Yup.object().shape({
                        email: Yup
                            .string()
                            .email('Emailの形式ではないようです。')
                            .required('Emailの入力は必須です。'),
                        password: Yup
                            .string()
                            .min(4, '4文字以上で入力して下さい。')
                            .required('パスワードの入力は必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, touched, handleBlur, isSubmitting }) => (
                            <Card title='サインイン'>
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {(touched.email && errors.email) && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                <FormLabel>パスワード</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry
                                />
                                {(touched.password && errors.password) && <FormValidationMessage>{errors.password}</FormValidationMessage>}
                                <Button
                                    title='サインイン'
                                    onPress={handleSubmit}
                                    buttonStyle={{ marginTop: 20 }}
                                    backgroundColor='#0099FF'
                                    loading={this.state.spinner}
                                    disabled={isSubmitting}
                                    icon={{ name: 'sign-in', type: 'font-awesome' }}
                                    borderRadius={20}

                                />
                                <Button
                                    title='パスワード忘れ'
                                    onPress={() => this.handleForgot()}
                                    buttonStyle={{ marginTop: 30 }}
                                    icon={{ name: 'question-circle', type: 'font-awesome' }}
                                    borderRadius={20}
                                />
                            </Card>
                        )
                    }
                </Formik>
                <Card title='サインアップ'>
                    <Button
                        title='サインアップ'
                        onPress={() => this.handleSignUp()}
                        buttonStyle={{ marginTop: 0 }}
                        backgroundColor='#CC9933'
                        icon={{ name: 'user-plus', type: 'font-awesome' }}
                        borderRadius={20}
                    />
                </Card>
            </View>
        );
    }

    handleSignIn = async (values, { setSubmitting }) => {

        //spinner on
        this.setState({ spinner: true });

        //sleep（非同期処理）
        await Devlib.sleep(1500);

        //spinner off
        this.setState({ spinner: false });
        //disable解除
        setSubmitting(false);

        //値の取得
        const email = values.email;
        const password = values.password;
        //値の設定
        user = {
            id: 99,
            name: 'hoge',
            email: email,
            signedIn: true,
        }
        //情報更新
        this.props.updateUserData(user);
        //移動
        this.props.navigation.navigate('SignedIn')
    }

    handleForgot = () => {
        this.props.navigation.navigate('Forgot')
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUp')
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
// export default SignIn;