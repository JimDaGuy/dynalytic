const models = require('../models');

const Account = models.Account;

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/app' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/app' });
    });

    savePromise.catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

// changePassword:
// - Change a user's password
// //////////////////////////////
const changePassword = (request, response) => {
  const req = request;
  const res = response;

  // Semi-santitize parameters
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.newpass1 = `${req.body.newpass1}`;
  req.body.newpass2 = `${req.body.newpass2}`;

  // Check for missing fields
  if (!req.body.username || !req.body.pass || !req.body.newpass1 || !req.body.newpass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check for non matching new password
  if (req.body.newpass1 !== req.body.newpass2) {
    return res.status(400).json({ error: 'New passwords do not match' });
  }

  // Authenticate with the current password
  return Account.AccountModel.authenticate(req.body.username, req.body.pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    // Generate a new hash and salt with the new password

    return Account.AccountModel.generateHash(req.body.newpass1, (salt, hash) => {
      // Change the user's salt and hash to the new salt and hash values
      Account.AccountModel.changePassword(account, salt, hash, (err2) => {
        if (err2) {
          return res.status(401).json({ error: 'Error occured while changing password' });
        }

        return res.status(200).json({ message: 'Successfully changed password' });
      });
    });
  });
};

module.exports = {
  login,
  logout,
  signup,
  changePassword,
};
