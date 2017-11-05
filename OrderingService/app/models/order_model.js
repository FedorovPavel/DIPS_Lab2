const mongoose  = require('mongoose'),
      Schema    = mongoose.Schema;

const OrderSchema = new Schema({
  UserID      : Schema.Types.ObjectId,
  CarID       : Schema.Types.ObjectId,
  BillingID   : Schema.Types.ObjectId,
  Lease       : {
    StartDate : Date,
    EndDate   : Date
  },
  DateOfIssue : Date,
  Status      : String
});

OrderSchema.virtual('date')
  .get(() => this._id.getTimestamp());

OrderSchema.statics.getOrder = function(id, callback){
  this.findByID(id, function(err, result){
    if (err)
      return callback(err, null);
    else {
      if (result) {
        let order = getOrder(result);
        return callback(null, result);
      } else {
        return callback(null, null);
      }
    }
  });  
};

OrderSchema.statics.createOrder = function(objectInfo, callback){
  let object = Object(objectInfo);
  const check = checkRequiredFields(Object.keys(object));
  if (check){
    let order = createOrder(object);
    if (order){
      order.save(function(err, result){
        if (err)
          return callback(err, null);
        else {
          let res = getOrder(result);
          return callback(null, res);
        }
      });
    } else {
      return callback('Unknown fields', null);
    }
  } else {
    return callback('not found required fields', null);
  }
}

function createOrder(object){
  const model = mongoose.model('Order');
  let item = new model();
  let errorParse = false;
  for (key in object){
    switch (key) {
      case 'UserID' :
        item.UserID = mongoose.Types.ObjectId(object[key]);
        break;
      case 'CarID'  :
        item.CarID  = mongoose.Types.ObjectId(object[key]);
        break;
      case 'StartDate' :
        item.Lease.StartDate = new Date(object[key]);
        break;
      case 'EndDate' :
        item.Lease.EndDate = new Date(object[key]);
        break;
      default :
        errorParse = true;
        break;
    }
  }
  if (errorParse)
    return null;
  item.DateOfIssue = Date.now();
  item.Status = 'Draft';
  return item;
}

function getOrder(record){
  let item = {
    ID          : record._id,
    UserID      : record.UserID,
    CarID       : record.CarID,
    BillingID   : record.BillingID,
    Lease       : {
      StartDate : record.Lease.StartDate,
      EndDate   : record.Lease.EndDate
    },
    DateOfIssue : record.DateOfIssue,
    Status      : record.Status
  };
  return item;
}

function checkRequiredFields(objectKeys){
  const keys = Array.from(objectKeys);
  const requiredField = ['UserID','CarID', 'StartDate', 'EndDate'];
  let flag = 0;
  for(let I = 0; I < keys.length; I++ ){
    if (requiredField.indexOf(keys[I]) != -1)
      flag++;
  }
  if (flag == requiredField.length) {
    return true;
  } else {
    return false;
  }
}

mongoose.model('Order', OrderSchema);