const mongoose  = require('mongoose'),
      Schema    = mongoose.Schema;

const OrderSchema = new Schema({
  UserID      : ObjectID,
  CarID       : ObjectID,
  BillingID   : ObjectID,
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
  const requiredField = ['UserID','CarID'];
  let object = Object(objectInfo);
  if (object.keys in requiredField){
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
  }
}

function createOrder(object){
  let item = new this.model();
  let errorParse = false;
  for (key in object){
    switch (key) {
      case 'UserID' :
        item.UserID = mongoose.Types.ObjectId(object[key]);
        break;
      case 'CarID'  :
        item.CarID  = mongoose.Types.ObjectId(object[key]);
        break;
      case 'BillingID' :
        item.BillingID = mongoose.Types.ObjectId(object[key]);
        break;
      case 'StartDate' :
        item.Lease.StartDate = Date(object[key]);
        break;
      case 'EndDate' :
        item.Lease.EndDate = Date(object[key]);
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
    Lease       : record.Lease,
    DateOfIssue : record.DateOfIssue,
    Status      : record.Status
  };
  return item;
}

mongoose.model('Order', OrderSchema);

