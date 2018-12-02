import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage, ListItem } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//Devlig
import * as Devlib from '../Devlib';

const list = Devlib.recommends;

class Home extends React.Component {
    state = {
        recommends: list,
    }
    render() {
        // console.log(this.state.recommends);
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <ScrollView>
                    <Card title='サインイン情報'>
                        <View style={{ alignItems: 'center' }}>
                            <Text>{this.props.state.userData.user.name}さんとしてサインイン中です。</Text>
                        </View>
                    </Card>
                    <FlatList
                        data={this.state.recommends}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Card
                                title={item.title}
                                image={{ uri: item.image }}
                            >
                                <Button
                                    title="もっと見る"
                                    backgroundColor='#CC9933'
                                    borderRadius={20}
                                    icon={{ name: 'eye', type: 'octicon' }}
                                />
                            </Card>
                        )}
                    />
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