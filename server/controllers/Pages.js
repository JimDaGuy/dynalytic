const defaultPage = (req, res) => {
  res.render('main', { csrfToken: req.csrfToken() });
};

const appPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

module.exports = {
  defaultPage,
  appPage,
};
