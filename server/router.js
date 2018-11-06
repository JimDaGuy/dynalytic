const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // Pages
  app.get('/', mid.requiresLogout, controllers.Pages.defaultPage);
  app.get('/app', mid.requiresLogin, controllers.Pages.appPage);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Pages.loginPage);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Pages.signupPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // Posts
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  // Security
  app.get('/getToken', mid.requiresSecure, controllers.Helper.getToken);
};

module.exports = router;
