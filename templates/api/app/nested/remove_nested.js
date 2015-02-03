/**
*    removing nested objects
*    @param {number} id of the resource to be deleted
*    @param {string} param name of the param where the resource is
*    @param {object} data
*    @return {object} altered object
*/
module.exports = function(id, param, data){
    var nested_array = data[param];
    if(nested_array.length){
        var i = nested_array.length;
        while(i--){
            if(nested_array[i].id === id)
                nested_array.splice(i,1);
        }
        data[param] = nested_array;
        return data;
    }
    else return data;
};