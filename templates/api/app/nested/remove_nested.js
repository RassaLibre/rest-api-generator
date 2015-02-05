/**
*    removing nested objects
*    @param {number} id of the resource to be deleted
*    @param {string} param name of the param where the resource is
*    @param {object} data
*    @param {string} compare_param_name compared param name in param
*    @return {object} altered object
*/
module.exports = function(id, param, data, compare_param_name){
    var nested_array = data[param];
    if(nested_array.length){
        var i = nested_array.length;
        while(i--){
            if(nested_array[i][compare_param_name] == id)
                nested_array.splice(i,1);
        }
        data[param] = nested_array;
        return data;
    }
    else return data;
};