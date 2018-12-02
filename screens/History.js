import React from 'react';
import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
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
        histories: [],
        isrefreshing: false,
        end_spinner: true,
    }

    componentWillMount() {
        this.setState({ histories: [] })
    }

    componentDidMount() {
        this.setState({ histories: list });
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='利用サマリ'>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Blance of Value：100</Text>
                    </View>
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
                        //pull
                        onRefresh={() => this.handleRefresh()}
                        refreshing={this.state.isrefreshing}
                        //infinit(EndReachedは原則1回だけ発生のよう)
                        onEndReached={() => this.handleEndReache()}
                        onEndReachedThreshold={0}
                        ListFooterComponent={() => <ActivityIndicator size='large' animating={this.state.end_spinner} />}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    // inverted
                    />
                </Card>
            </View>
        );
    }

    handleRefresh = async () => {
        await Devlib.sleep(1500);
        this.setState({ refreshing: false });
        alert('refresh'); //alertのタイミングでspinnerが閉じないことがある（本番でalert + spinnerは併用しないほうがいいかも）
    }

    handleEndReache = async () => {

        if (!this.onEndReachedCalledDuringMomentum) {

            // https://github.com/facebook/react-native/issues/14015#issuecomment-310675650
            //処理
            this.setState({ end_spinner: true });
            await Devlib.sleep(1500);
            this.setState({ end_spinner: false });
            alert('end');

            this.onEndReachedCalledDuringMomentum = true;
        }
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