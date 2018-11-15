const models = require('../models');
const JSONCSVParser = require('json2csv').Parser;

const Dataset = models.Dataset;

// eslint-disable-next-line consistent-return
const uploadDataset = (req, res) => {
  if (!req.body.datasetName) {
    return res.status(400).json({ error: 'Dataset name is required' });
  }

  const owner = req.session.account._id;
  const datasetName = req.body.datasetName;
  const csvData = req.body.csvData;

  // Check availability of dataset name for user
  // eslint-disable-next-line consistent-return
  Dataset.DatasetModel.checkDatasetName(req.session.account._id, datasetName, (err, result) => {
    if (err) {
      console.dir(`Error searching dataset name availability: ${err}`);
      return res.status(400).json({ error: 'Error checking availability of dataset name' });
    }

    // No results found, continue to create dataset
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
        console.dir('Successfully saved dataset');
        return res.status(200).json({ error: 'Dataset successfully saved' });
      });

      // Issue saving dataset
      dsPromise.catch((err2) => {
        console.log(err2);
        return res.status(400).json({ error: 'Error saving dataset to the database' });
      });
    } else {
      // Dataset already exists, needs new name
      return res.status(400).json({ error: 'Dataset name already exists for this user' });
    }
  });
};

const getDatasetList = (req, res) => {
  Dataset.DatasetModel.getDatasetList(req.session.account._id, (err, result) => {
    if (err) {
      console.dir(`Error fetching dataset list: ${err}`);
      return res.status(400).json({ error: 'Error fetching dataset list' });
    }

    const datasetResults = {
      datasets: result,
    };

    return res.status(200).send(JSON.stringify(datasetResults));
  });
};

// eslint-disable-next-line consistent-return
const getDataset = (req, res) => {
  if (!req.query.datasetID) {
    return res.status(400).json({ error: 'Dataset ID required for dataset lookup' });
  }

  Dataset.DatasetModel.getDataset(req.session.account._id, req.query.datasetID, (err, result) => {
    if (err) {
      console.dir(`Error fetching dataset: ${err}`);
      return res.status(400).json({ error: 'Error fetching dataset' });
    }

    const datasetResults = {
      dataset: result,
    };

    return res.status(200).send(JSON.stringify(datasetResults));
  });
};

// eslint-disable-next-line consistent-return
const getDatasetCSV = (req, res) => {
  if (!req.query.datasetID) {
    return res.status(400).json({ error: 'Dataset ID required for dataset lookup' });
  }

  Dataset.DatasetModel.getDataset(req.session.account._id, req.query.datasetID, (err, result) => {
    if (err) {
      console.dir(`Error fetching dataset: ${err}`);
      return res.status(400).json({ error: 'Error fetching dataset' });
    }

    const fields = result.columns;
    const values = result.entries;

    const jcParser = new JSONCSVParser({ fields });
    const parsedCSV = jcParser.parse(values);

    return res.status(200).send(parsedCSV);
  });
};

// eslint-disable-next-line consistent-return
const removeDataset = (req, res) => {
  if (!req.body.datasetID) {
    return res.status(400).json({ error: 'Dataset ID required to delete dataset' });
  }

  Dataset.DatasetModel.removeDataset(req.session.account._id, req.body.datasetID, (err) => {
    if (err) {
      console.dir(`Error removing dataset: ${err}`);
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
