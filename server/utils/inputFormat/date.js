module.exports = (date) => {
    let splitedDate = date.split('-')
    let formatedDate = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
    return formatedDate
}