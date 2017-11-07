const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillingSchema = new Schema({
  PaySystem       : String,
  Account         : String,
  Cost            : {type : Number, min: 10.0},
  DateOfPayment   : Date
});

BillingSchema.virtual('date')
  .get(() => this._id.getTimestamp());

BillingSchema.statics.getBillingRecord = function(id, callback){
  if (!id || typeof(id) == 'undefined' || id.length == 0)
    return callback('ID is undefined', null);
  this.getById(id, function(err, record){
    if (err) {
      return callback(err, null);
    } else {
      if (record){
        return callback(null,getBillingRecordInfo(record));
      } else {
        return (null, null);
      }
    }
  });
}

BillingSchema.statics.createBillingRecord = function(object, callback){
  if (!object || typeof(object) == 'undefined' || typeof(object) != 'object')
    return callback('Params is undefined', null);
  let record = createBillingRecord(object);
  return record.save(function(err, result){
    if(err)
      return callback(err, null);
    else {
      if (result){
        return callback(null, result);
      } else {
        return callback('Not saved', null);
      }
    }
  });
}

mongoose.model('Billing', BillingSchema);

function getBillingRecordInfo(record){
  let item = {
    'id'            : record._id,
    'PaySystem'     : record.PaySystem,
    'Account'       : record.Account,
    'Cost'          : record.Cost,
    'DateOfPayment' : record.DateOfPayment
  };
  return item;
}

function createBillingRecord(object){
  const model = mongoose('Billing');
  let record = new model();
  const keys = Object.keys(object);
  for (key in keys){
    switch(key.toLowerCase()){
      case 'paysystem'  : 
        record.PaySystem = object[key];
        break;
      case 'account'    :
        record.Account = object[key];
        break;
      case 'cost'       :
        record.Cost = object[key];
    }
  }
  record.DateOfPayment = Date.now();
  return record;
}