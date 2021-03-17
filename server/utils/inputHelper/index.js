const formatDate = (date) => {
    let splitedDate = date.split('-')
    let formatedDate = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
    return formatedDate
}

const formatTime = (time) => {
    let splitedTime = time.split(':')
    let formatedTime = `${splitedTime[0]}h${splitedTime[1]}`
    return formatedTime
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    formatDate: formatDate,
    formatTime: formatTime,
    capitalize: capitalize
}