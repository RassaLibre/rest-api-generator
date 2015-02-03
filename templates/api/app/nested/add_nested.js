/**
*    adds a new object into the data
*    @param {object} new_obj
*    @param {string} param
*    @param {object} data
*    @return {object}
*/
module.exports = function(new_obj, param, data){
    data[param].push(new_obj);
    return data;
}