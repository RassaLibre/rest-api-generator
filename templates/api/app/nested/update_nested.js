/**
*    updating nested objects
*    @param {object} update_obj
*    @param {number} id
*    @param {string} param
*    @param {object} data
*    @param {string} compare_param_name which param should be @param id compared to
*    @return {object} altered object
*/
module.exports = function(update_obj, id, param, data, compare_param_name){
    var nested_array = data[param];
    if(nested_array.length){
        for(var i = 0; i < nested_array.length; i++){
            if(nested_array[i][compare_param_name] == id){
                //can be done with _ i think
                for (var prop in update_obj) {
                    if (update_obj.hasOwnProperty(prop)) {
                        nested_array[i][prop] = update_obj[prop];
                    }
                }
            }
        }
        data[param] = nested_array;
        return data;
    }
    else return data;
}