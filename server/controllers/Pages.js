const defaultPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

const loginPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

const signupPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

const appPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

module.exports = {
  defaultPage,
  loginPage,
  signupPage,
  appPage,
};
