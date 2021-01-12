export default value => {
    return value.substr(0,1).toUpperCase() + value.substr(1, value.length -1)
}