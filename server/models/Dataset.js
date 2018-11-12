const mongoose = require('mongoose');

let DatasetModel = {};

const DatasetSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  datasetName: {
    type: String,
  },
  columns: {
    type: [String],
  },
  entries: {
    type: Array,
  },
});

DatasetSchema.statics.checkDatasetName = (owner, datasetName, callback) => {
  const searchParams = {
    owner,
    datasetName,
  };

  return DatasetModel.findOne(searchParams, (err, result) => {
    callback(err, result);
  });
};

DatasetModel = mongoose.model('Dataset', DatasetSchema);

module.exports.DatasetModel = DatasetModel;
module.exports.DatasetSchema = DatasetSchema;
