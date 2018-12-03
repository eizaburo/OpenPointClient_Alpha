import { AsyncStorage } from "react-native";

//サインイン
export const onSignIn = (access_token) => AsyncStorage.setItem('ACCESS_TOKEN', access_token);

//サインアウト
export const onSignOut = () => AsyncStorage.removeItem('ACCESS_TOKEN');

//状態確認
export const isSignedIn = async () => {

    try {

        //token取得
        const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');

        //状態を確認
        if (access_token !== null) {
            return { signedIn: true, access_token: access_token }
        } else {
            return { signedIn: false, access_token: '' }
        }

    } catch (error) {
        console.log(error);
    }
}