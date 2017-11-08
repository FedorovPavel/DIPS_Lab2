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

OrderSchema.statics.getOrders = function(user_id, page, count, callback){
  if (user_id.length  == 0  || !user_id || typeof(user_id)  == 'undefined' ||
      page < 0  || typeof(page)     == 'undefined' ||
      count <= 0  || typeof(count)    == 'undefined'){
      return callback('user ID is undefined', null);
  } else {
    return this.find({'UserID' : user_id}, function(err, orders){
      if (err)
        return callback(err, null);
      else {
        if (orders) {
          let result = [];
          for (let I = 0; I < orders.length; I++){
            let item = getOrder(orders[I]);
            result[I] = item;
          }
          return callback(null, result);
        } else {
          return callback(null, null);
        }
      }
    }).skip(page*count).limit(count); 
  }
};

OrderSchema.statics.getOrder = function(id, callback){
  return this.findById(id, function(err, result){
    if (err)
      return callback(err, null);
    else {
      if (result) {
        let order = getOrder(result);
        return callback(null, order);
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
      return order.save(function(err, result){
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

OrderSchema.statics.setWaitStatus = function(id, callback){
  if (!id || id.length == 0 || typeof(id) == 'undefined'){
    return callback('ID is undefined', null);
  } else {
    return this.findById(id, function(err, order){
      if (err)
        return callback(err, null);
      else {
        if (order){
          if (order.Status == 'Draft'){
            order.Status = 'WaitForBilling';
            order.save(function(err, res){
              if (err)
                return callback(err, null);
              else 
                callback(null, res);
            });
          } else {
            return callback("Status don't right", null);
          }
        } else { 
          return callback(null, null);
        }
      }
    });
  }
};

OrderSchema.statics.setPaidStatus = function(id, callback){
  if (!id || id.length == 0 || typeof(id) == 'undefined'){
    return callback('ID is undefined', null);
  } else {
    return this.findById(id, function(err, order){
      if (err)
        return callback(err, null);
      else {
        if (order){
          if (order.Status == 'WaitForBilling'){
            order.Status = 'Paid';
            order.save(function(err, res){
              if (err)
                return callback(err, null);
              else 
                callback(null, res);
            });
          } else {
            return callback("Status don't right", null);
          }
        } else { 
          return callback(null, null);
        }
      }
    });
  }
};

OrderSchema.statics.setCompletedStatus = function(id, callback){
  if (!id || id.length == 0 || typeof(id) == 'undefined'){
    return callback('ID is undefined', null);
  } else {
    return this.findById(id, function(err, order){
      if (err)
        return callback(err, null);
      else {
        if (order){
          if (order.Status == 'Paid'){
            order.Status = 'Completed';
            order.save(function(err, res){
              if (err)
                return callback(err, null);
              else 
                callback(null, res);
            });
          } else {
            return callback("Status don't right", null);
          }
        } else { 
          return callback(null, null);
        }
      }
    });
  }
};

OrderSchema.statics.attachBilling = function(order_id, billing_id, callback){
  if (order_id && billing_id){
    return this.findByIdAndUpdate(order_id,{$set:{BillingID:billing_id}}, function(err, result){
      if (err)
        return callback(err, null);
      else {
        if (result){
          const res = getOrder(result);
          return callback(null, res);
        } else {
          return callback(null, null);
        }
      }
    })
  } else {
    return callback('Bad params', null);
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