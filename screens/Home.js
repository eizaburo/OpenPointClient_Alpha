import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

class Home extends React.Component {

    componentDidMount() {  
        //もしpageがセットされていて
        const page = this.props.state.navData.nav.page;
        //空じゃなかったら
        if (page !== '') {
            //指定されたページへ移動
            this.props.navigation.navigate(page);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home</Text>
                <Text>Data: {this.props.state.qrData.qr.data}</Text>
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
        updateQrData: (data) => dispatch(updateQrData(data)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;