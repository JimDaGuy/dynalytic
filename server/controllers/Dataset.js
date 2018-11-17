const models = require('../models');
const JSONCSVParser = require('json2csv').Parser;

const Dataset = models.Dataset;

// uploadDataset:
// - Create a new dataset and save it to the database
// //////////////////////////////
// eslint-disable-next-line consistent-return
const uploadDataset = (req, res) => {
  if (!req.body.datasetName) {
    return res.status(400).json({ error: 'Dataset name is required' });
  }

  const owner = req.session.account._id;
  const datasetName = req.body.datasetName;
  const csvData = req.body.csvData;

  // Make sure the database name is available before continuing
  // eslint-disable-next-line consistent-return
  Dataset.DatasetModel.checkDatasetName(req.session.account._id, datasetName, (err, result) => {
    if (err) {
      return res.status(400).json({ error: 'Error checking availability of dataset name' });
    }

    // No existing dataset found with proposed name, continue to create dataset
    if (!result || result.length < 1) {
      const columns = Object.keys(csvData[0]);

      const datasetDetails = {
        owner,
        datasetName,
        columns,
        entries: csvData,
      };

      const newDataset = new Dataset.DatasetModel(datasetDetails);

      const dsPromise = newDataset.save();

      // After saving dataset information, create entries for the passed in csv
      dsPromise.then(() => {
        res.status(200).json({ message: 'Dataset successfully saved' });
      });

      // Issue saving dataset
      dsPromise.catch(() => {
        res.status(400).json({ error: 'Error saving dataset to the database' });
      });
    } else {
      // Dataset already exists, needs new name
      return res.status(400).json({ error: 'Dataset name already exists for this user' });
    }
  });
};

// getDatasetList:
// - Return list of datasets saved under the currently signed in user
// //////////////////////////////
const getDatasetList = (req, res) => {
  // Get list of datasets for current user
  Dataset.DatasetModel.getDatasetList(req.session.account._id, (err, result) => {
    if (err) {
      return res.status(400).json({ error: 'Error fetching dataset list' });
    }

    const datasetResults = {
      datasets: result,
    };

    return res.status(200).send(JSON.stringify(datasetResults));
  });
};

// getDataset:
// - Return dataset matching the passed in datasetID owner by the currently signed in user
// //////////////////////////////
// eslint-disable-next-line consistent-return
const getDataset = (req, res) => {
  if (!req.query.datasetID) {
    return res.status(400).json({ error: 'Dataset ID required for dataset lookup' });
  }

  // Return dataset matching the passed in datasetID
  Dataset.DatasetModel.getDataset(req.session.account._id, req.query.datasetID, (err, result) => {
    if (err) {
      return res.status(400).json({ error: 'Error fetching dataset' });
    }

    const datasetResults = {
      dataset: result,
    };

    return res.status(200).send(JSON.stringify(datasetResults));
  });
};

// getDatasetCSV:
// - Return urlEncoded string containing the dataset information to be used for downloading
// //////////////////////////////
// eslint-disable-next-line consistent-return
const getDatasetCSV = (req, res) => {
  if (!req.query.datasetID) {
    return res.status(400).json({ error: 'Dataset ID required for dataset lookup' });
  }

  // Get dataset matching the passed in datasetID belonging to the currently signed in user
  Dataset.DatasetModel.getDataset(req.session.account._id, req.query.datasetID, (err, result) => {
    if (err) {
      return res.status(400).json({ error: 'Error fetching dataset' });
    }

    const fields = result.columns;
    const values = result.entries;

    // Parse JSON values to CSV string
    const jcParser = new JSONCSVParser({ fields });
    const parsedCSV = jcParser.parse(values);

    return res.status(200).send(parsedCSV);
  });
};

// removeDataset:
// - Delete dataset matching the datasetID passed in belonging to the currently signed in user
// //////////////////////////////
// eslint-disable-next-line consistent-return
const removeDataset = (req, res) => {
  if (!req.body.datasetID) {
    return res.status(400).json({ error: 'Dataset ID required to delete dataset' });
  }

  // Remove dataset matching the passed in datasetID belonging to the currently signed in user
  Dataset.DatasetModel.removeDataset(req.session.account._id, req.body.datasetID, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error removing dataset' });
    }

    return res.status(200).json({ message: 'Dataset successfully removed' });
  });
};

module.exports.uploadDataset = uploadDataset;
module.exports.getDatasetList = getDatasetList;
module.exports.getDataset = getDataset;
module.exports.getDatasetCSV = getDatasetCSV;
module.exports.removeDataset = removeDataset;
