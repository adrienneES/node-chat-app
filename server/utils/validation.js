const isRealString = (str)=>{
    return (
        typeof str === 'string' 
        && str.trim().length > 0 
        && !(str.charAt(0).match(/[a-z]/i)=== null));
}
module.exports = {
    isRealString
}