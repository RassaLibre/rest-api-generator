var _ = require('underscore');


function Model(){};

/**
* function assigns the passed data to object
* @param {Object} v
*/
Model.prototype.assign = function(v){
  v = v || {};
  var stored_id = v._id || null;
  // Filter allowed fields
  v = _.pick(v, _.keys(this.fields));
  //if the ID has been sent too (happens with nested objects)
  //store it in the result too
  if(stored_id) v._id = stored_id;
  // Assign resulting object to this
  _.extend(this, v);
};

/**
* function should be used every time data are served to the user. The function
* filters the fields that should be sent according to the fields
* @param {Object|Array} data
* @return {Object|Array}
*/
Model.prototype.to_public = function(data){
  // Support arrays of objects
  if (Array.isArray(data)) {
      var self = this;
      return _.map(data, function(d) { return self.to_public(d); });
  }
  var res = _.pick(data, _.keys(this.fields));
  res.id = (data._id) ? data._id : data.id;
  return res;
};

/**
* function returns the current object as JSON
* @return {Object}
*/
Model.prototype.to_JSON = function(){
  var keys = _.keys(this.fields);
  var to_be_returned = {};
  for(var i = 0; i < keys.length; i++){
    var key = keys[i];
    if(this[key]){
      to_be_returned[key] = this[key];
    }
  }
  if(this._id) to_be_returned._id = this._id;
  return to_be_returned;
};

/**
* function works like a filter for data received from public
* @param {Object} data
* @return {Object}
*/
Model.prototype.from_public = function(data){
  return _.pick(data, _.keys(this.fields));
};

/**
* validates the data based on the fields
* @return {Bool}
*/
Model.prototype.is_valid = function(){
  var field_keys = _.keys(this.fields); //get the keys of fields
  for(var i = 0; i < field_keys.length; i++){ //loop over them
    var key = field_keys[i];
    //execute the check only if the filed is defined
    if(!_.isUndefined(this[key])){
      //if the value is string, check if the regex and the length fits
      if(this.fields[key].type === "string"){
        if(this.fields[key].regex){
          if(!this[key].match(this.fields[key].regex)) return false;
        }
        if(this.fields[key].length){
          if(!this[key].length > this.fields[key].length) return false;
        }
      }

      //if the value is integer or double, check the min and max value
      else if((this.fields[key].type === "integer")||(this.fields[key].type === "double")){
        if(this.fields[key].min){
          if(this[key] <= this.fields[key].min) return false;
        }
        if(this.fields[key].max){
          if(this[key] >= this.fields[key].max) return false;
        }
      }

      //if the value is timstamp, check that it is an number
      else if(this.fields[key].type === "timestamp"){
        if(typeof this[key] !== "number") return false;
      }

      //if the value is geojson, check that the value is object with properties
      //coordinates and geometry
      else if(this.fields[key].type === "geojson"){
        if(typeof this[key] !== "object") return false;
        if(!this[key].coordinates) return false;
        if(!this[key].type) return false;
      }

      //I have no idea what to do here
      else if(this.fields[key].type === "array"){
        if(!_.isArray(this[key])) return false;
      }
      
      //nor here
      else{
        if(typeof this[key] !== "object") return false;
      }

    }
  }
  return true;
};

/*
* export
*/
module.exports = Model;



