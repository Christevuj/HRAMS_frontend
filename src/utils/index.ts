import moment from 'moment'
const dateFormatter = (date:string | Date) => moment(date).format('MMMM DD, YYYY');
const dateStringFormatter = (date:string | Date) => moment(date).format('MMMM DD, YYYY hh:mm A');

export {
    dateFormatter,
    dateStringFormatter
}