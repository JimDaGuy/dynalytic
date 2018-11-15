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
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
});

DatasetSchema.statics.checkDatasetName = (owner, datasetName, callback) => {
  const searchParams = {
    owner,
    datasetName,
  };

  return DatasetModel.findOne(searchParams).exec(callback);
};

DatasetSchema.statics.getDatasetList = (owner, callback) => {
  const searchParams = { owner };
  const returnedFields = ['datasetName', 'lastEdited', '_id'];
  const sortBy = { lastEdited: -1 };

  return DatasetModel.find(searchParams).select(returnedFields).sort(sortBy)
  .exec(callback);
};

DatasetSchema.statics.getDataset = (owner, datasetId, callback) => {
  const searchParams = { owner, _id: datasetId };
  const returnedFields = ['datasetName', 'columns', 'entries', 'lastEdited'];

  return DatasetModel.findOne(searchParams).select(returnedFields).lean()
  .exec(callback);
};

DatasetSchema.statics.removeDataset = (owner, datasetId, callback) => {
  const searchParams = { owner, _id: datasetId };

  return DatasetModel.remove(searchParams).exec(callback);
};

DatasetModel = mongoose.model('Dataset', DatasetSchema);

module.exports.DatasetModel = DatasetModel;
module.exports.DatasetSchema = DatasetSchema;