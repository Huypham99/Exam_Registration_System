module.exports = (time) => {
    let splitedTime = time.split(':')
    let formatedTime = `${splitedTime[0]}h${splitedTime[1]}`
    return formatedTime
}