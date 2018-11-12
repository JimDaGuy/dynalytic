const models = require('../models');

const Dataset = models.Dataset;

const createDataset = (datasetName, headings, callback) => {
  callback();
};

const uploadDataset = (req, res) => {
  if (!req.body.datasetName) {
    return res.status(400).json({ error: 'Dataset name is required' });
  }

  const owner = req.session.account._id;
  const datasetName = req.body.datasetName;
  const csvData = req.body.csvData;

  // Check availability of dataset name for user
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

module.exports.uploadDataset = uploadDataset;
