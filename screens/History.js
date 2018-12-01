import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
//react-native-elements
import { Card, Button, FormLabel, FormInput, FormValidationMessage, ListItem, Icon, colors } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//Devlig
import * as Devlib from '../Devlib';

const list = Devlib.histories;

class History extends React.Component {

    state = {
        histories: list,
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='利用サマリ'>
                    <Text>残Value：100</Text>
                </Card>
                <Card title='利用履歴'>
                    <FlatList
                        data={this.state.histories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ListItem
                                key={item.id}
                                title={'  ' + item.id + '   ' + item.from + ' → ' + item.to + '     ' + item.value + ' Value'}
                                subtitle={'   ' + item.datetime + '@' + item.place}
                                leftIcon={{ name: item.icon, type: 'font-awesome', color: item.color }}
                                hideChevron
                            />
                        )}
                    />
                </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(History);
// export default History;