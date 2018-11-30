import React from 'react';
import { View, Text, ScrollView } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <ScrollView>
                    <Card title='サインイン情報'>
                        <View style={{alignItems:'center'}}>
                            <Text>{this.props.state.userData.user.name}さんとしてサインイン中です。</Text>
                        </View>
                    </Card>
                    <Card
                        title='おすすめ情報１'
                        image={{ uri: 'https://cdn.pixabay.com/photo/2015/07/27/19/44/spaghetti-863304_960_720.jpg' }}
                    >
                        <Button
                            title="もっと見る"
                            backgroundColor='#CC9933'
                            borderRadius={20}
                            icon={{ name: 'eye', type: 'octicon' }}
                        />
                    </Card>
                    <Card
                        title='おすすめ情報２'
                        image={{ uri: 'https://cdn.pixabay.com/photo/2016/06/10/01/05/hotel-room-1447201_960_720.jpg' }}
                    >
                        <Button
                            title="もっと見る"
                            backgroundColor='#CC9933'
                            borderRadius={20}
                            icon={{ name: 'eye', type: 'octicon' }}
                        />
                    </Card>
                </ScrollView>
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