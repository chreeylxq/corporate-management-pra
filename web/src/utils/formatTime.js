import moment from 'moment';

moment.locale('zh-cn');
const formatTime = {
    getTime: time => moment(time).format('lll')
}


export default formatTime