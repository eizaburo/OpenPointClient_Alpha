export const sleep = (sec) => {
    return new Promise(resolve => {
        setTimeout(resolve, sec);
    })
}

export const histories = [
    { id: 1, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 2, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 3, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
    { id: 4, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 5, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 6, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Kyoto', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
    { id: 7, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
    { id: 8, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 9, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 10, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
    { id: 11, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 12, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 13, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
    { id: 14, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 15, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 16, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Kyoto', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
    { id: 17, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
    { id: 18, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 19, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-up', color:'#ff3366'},
    { id: 20, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23', icon:'arrow-down', color:'#6699CC'},
];