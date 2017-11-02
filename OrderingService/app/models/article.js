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
  DateOfIssue : Date
});

OrderSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Order', OrderSchema);

