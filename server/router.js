const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // Pages
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Pages.defaultPage);
  app.get('/app', mid.requiresSecure, mid.requiresLogin, controllers.Pages.appPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // Posts
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.post('/upload', mid.requiresSecure, mid.requiresLogin, controllers.Dataset.uploadDataset);

  // Get Information
  app.get('/getDatasetList', mid.requiresSecure, mid.requiresLogin,
  controllers.Dataset.getDatasetList);
  app.get('/getDataset', mid.requiresSecure, mid.requiresLogin,
  controllers.Dataset.getDataset);
  app.get('/getDatasetCSV', mid.requiresSecure, mid.requiresLogin,
  controllers.Dataset.getDatasetCSV);

  // Security
  app.get('/getToken', mid.requiresSecure, controllers.Helper.getToken);
};

module.exports = router;
