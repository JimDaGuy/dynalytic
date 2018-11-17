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
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogout,
  controllers.Account.changePassword);

  app.post('/upload', mid.requiresSecure, mid.requiresLogin, controllers.Dataset.uploadDataset);

  // Get Information
  app.get('/getDatasetList', mid.requiresSecure, mid.requiresLogin,
  controllers.Dataset.getDatasetList);
  app.get('/getDataset', mid.requiresSecure, mid.requiresLogin,
  controllers.Dataset.getDataset);
  app.get('/getDatasetCSV', mid.requiresSecure, mid.requiresLogin,
  controllers.Dataset.getDatasetCSV);

  // Remove Information
  app.delete('/removeDataset', mid.requiresSecure, mid.requiresLogin,
  controllers.Dataset.removeDataset);

  // Security
  app.get('/getToken', mid.requiresSecure, controllers.Helper.getToken);

  // Any not found pages redirect to landing
  app.get('*', mid.requiresSecure, mid.requiresLogout, controllers.Pages.defaultPage);
};

module.exports = router;
