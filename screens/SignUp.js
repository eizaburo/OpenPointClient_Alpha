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

class SignUp extends React.Component {

    state = {
        spinner: false,
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => this.handleSignUp(values, { setSubmitting })}
                    validationSchema={Yup.object().shape({
                        name: Yup
                            .string()
                            .min(4, '名前は4文字以上8文字以内で入力して下さい。')
                            .max(8, '名前は4文字以上8文字以内で入力して下さい。')
                            .required('名前の入力は必須です。'),
                        email: Yup
                            .string()
                            .email('Emailの形式ではないようです。')
                            .required('Emailの入力は必須です。')
                            .test('check-mail-exist', '該当のアドレスは既に登録されています。', (value) => {
                                if (value === 'test@test.com') {
                                    return false;
                                } else {
                                    return true;
                                }
                            }),
                        password: Yup
                            .string()
                            .min(4, '4文字以上で入力して下さい。')
                            .required('パスワードの入力は必須です。'),
                        passwordConfirm: Yup
                            .string()
                            .required('パスワードの確認は必須です。')
                            .oneOf([Yup.ref('password')], 'パスワードが一致しません。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, touched, handleBlur, isSubmitting }) => (
                            <Card title='サインアップ'>
                                <FormLabel>名前</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    placeholder={'bluecode'}
                                />
                                {(touched.name && errors.name) && <FormValidationMessage>{errors.name}</FormValidationMessage>}
                                <FormLabel>Email（サインインIDとなります）</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    placeholder={'signup@bluecode.jp'}
                                />
                                {(touched.email && errors.email) && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                <FormLabel>パスワード</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    placeholder={'password'}
                                    secureTextEntry
                                />
                                {(touched.password && errors.password) && <FormValidationMessage>{errors.password}</FormValidationMessage>}
                                <FormLabel>パスワード（確認）</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.passwordConfirm}
                                    onChangeText={handleChange('passwordConfirm')}
                                    onBlur={handleBlur('passwordConfirm')}
                                    placeholder={'password'}
                                    secureTextEntry
                                />
                                {(touched.passwordConfirm && errors.passwordConfirm) && <FormValidationMessage>{errors.passwordConfirm}</FormValidationMessage>}
                                <Button
                                    title='サインアップ'
                                    onPress={handleSubmit}
                                    buttonStyle={{ marginTop: 20 }}
                                    backgroundColor='#CC9933'
                                    loading={this.state.spinner}
                                    disabled={isSubmitting}
                                    icon={{ name: 'user-plus', type: 'font-awesome' }}
                                    borderRadius={20}
                                />
                            </Card>
                        )
                    }
                </Formik>
            </View>
        );
    }

    handleSignUp = async (values, { setSubmitting }) => {

        //spinner on
        this.setState({ spinner: true });

        //sleep（非同期処理）
        await Devlib.sleep(1500);

        // //spinner off
        this.setState({ spinner: false });
        //disable解除
        setSubmitting(false);

        //値の取得
        const name = values.name;
        const email = values.email;
        const password = values.password;
        const passwordConfirm = values.passwordConfirm;
        //値の設定
        user = {
            id: 77,
            name: name,
            email: email,
            signedIn: true,
        }
        //値の更新
        this.props.updateUserData(user);
        //移動
        this.props.navigation.navigate('SignedIn')
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp;