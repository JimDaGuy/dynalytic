// Landing page for default users
// Displays information about the application and sign in / sign up links
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handleSignInClick = this.props.handleSignInClick;
    const handleSignUpClick = this.props.handleSignUpClick;

    return (
      <div id="header">
        <a href="/" className="headerProjectName">dynalytic</a>
        <button className="signInLink" onClick={handleSignInClick}>Sign In</button>
        <button className="signUpLink" onClick={handleSignUpClick}>Sign Up</button>
      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="content">
        <h1 className="appName">dynalytic</h1>
        <h2 className="appTagline">Visualize your data</h2>
        <div className="appDescription">
          Dynalytic allows users to store their datasets and download them with ease.
          Simply upload a csv file, provide a name for your data, and create a new dataset.
          Dynalytic will provide features to premium users for analyzing and modifying
          their datasets as well as accompanying visualizations to help them better understand
          their data. Dynalytic helps to make your data do the most work for you.
          Create an account to get started!
      </div>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUsername: '',
      loginPassword: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpPasswordSecondary: '',
      changeUsername: '',
      changePassword: '',
      changeNewPassword: '',
      changeNewPasswordSecondary: '',
      loginErrorMessage: '',
      signUpErrorMessage: '',
      changeErrorMessage: '',
    }

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleChangePasswordSubmit = this.handleChangePasswordSubmit.bind(this);

    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleSignUpUsernameChange = this.handleSignUpUsernameChange.bind(this);
    this.handleSignUpPasswordChange = this.handleSignUpPasswordChange.bind(this);
    this.handleSignUpPasswordSecondaryChange = this.handleSignUpPasswordSecondaryChange.bind(this);
    this.handleChangeUsernameChange = this.handleChangeUsernameChange.bind(this);
    this.handleChangePasswordChange = this.handleChangePasswordChange.bind(this);
    this.handleChangeNewPasswordChange = this.handleChangeNewPasswordChange.bind(this);
    this.handleChangeNewPasswordSecondaryChange = this.handleChangeNewPasswordSecondaryChange.bind(this);

    this.displayLoginError = this.displayLoginError.bind(this);
    this.displaySignupError = this.displaySignupError.bind(this);
    this.displayChangeError = this.displayChangeError.bind(this);
  }

  // handleLoginSubmit:
  // - Prevent default action, check form before sending login post to server, display errors when neccesary
  // //////////////////////////////
  handleLoginSubmit(e) {
    e.preventDefault();

    if (this.state.loginUsername == '' || this.state.loginPassword == '') {
      this.displayLoginError('Enter a username and password');
      return false;
    }

    this.sendAjaxDisplayError('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect,
      (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);
        this.displayLoginError(messageObj.error);
      }
    );

    return false;
  }

  // handleSignupSubmit:
  // - Prevent default action, check form before sending signup post to server, display errors when neccesary
  // //////////////////////////////
  handleSignUpSubmit(e) {
    e.preventDefault();

    if (this.state.signUpUsername == '' || this.state.signUpPassword == '' || this.state.signUpPasswordSecondary == '') {
      this.displaySignupError('All fields are required for signing up.');
      return false;
    }

    if (this.state.signUpPassword !== this.state.signUpPasswordSecondary) {
      this.displaySignupError('The passwords entered do not match.');
      return false;
    }

    this.sendAjaxDisplayError('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect,
      (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);
        this.displaySignupError(messageObj.error);
      }
    );

    return false;
  }

  // handleChangePasswordSubmit:
  // - Prevent default action, check form before sending change pw post to server, display errors when neccesary
  // //////////////////////////////
  handleChangePasswordSubmit(e) {
    e.preventDefault();

    if (this.state.changeUsername == '' || this.state.changePassword == '' || this.state.changeNewPassword == '' || this.state.changeNewPasswordSecondary == '') {
      this.displayChangeError('All fields are required for signing up.');
      return false;
    }

    if (this.state.changeNewPassword !== this.state.changeNewPasswordSecondary) {
      this.displayChangeError('The new password fields do not match.');
      return false;
    }

    this.sendAjaxDisplayError('POST', $("#changeForm").attr("action"), $("#changeForm").serialize(), redirect,
      (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);
        this.displayChangeError(messageObj.error);
      }
    );

    return false;
  }

  // sendAjaxDisplayError:
  // - Send AJAX to the server, contains callbacks for success and error
  // //////////////////////////////
  sendAjaxDisplayError(type, action, data, success, error) {
    $.ajax({
      cache: false,
      type,
      url: action,
      data,
      dataType: "json",
      success,
      error,
    });
  }

  handleLoginUsernameChange(e) {
    this.setState({
      loginUsername: e.target.value,
    });
  }

  handleLoginPasswordChange(e) {
    this.setState({
      loginPassword: e.target.value,
    });
  }

  handleSignUpUsernameChange(e) {
    this.setState({
      signUpUsername: e.target.value,
    });
  }

  handleSignUpPasswordChange(e) {
    this.setState({
      signUpPassword: e.target.value,
    });
  }

  handleSignUpPasswordSecondaryChange(e) {
    this.setState({
      signUpPasswordSecondary: e.target.value,
    });
  }

  handleChangeUsernameChange(e) {
    this.setState({
      changeUsername: e.target.value,
    });
  }

  handleChangePasswordChange(e) {
    this.setState({
      changePassword: e.target.value,
    });
  }

  handleChangeNewPasswordChange(e) {
    this.setState({
      changeNewPassword: e.target.value,
    });
  }

  handleChangeNewPasswordSecondaryChange(e) {
    this.setState({
      changeNewPasswordSecondary: e.target.value,
    });
  }

  displayLoginError(message) {
    this.setState({
      loginErrorMessage: message,
    });
  }

  displaySignupError(message) {
    this.setState({
      signUpErrorMessage: message,
    })
  }

  displayChangeError(message) {
    this.setState({
      changeErrorMessage: message,
    })
  }

  render() {
    const loggingIn = this.props.loggingIn;
    const signingUp = this.props.signingUp;
    const changingPassword = this.props.changingPassword;
    const csrf = this.props.csrf;
    const handleChangePasswordClick = this.props.handleChangePasswordClick;
    const handleOverlayClick = this.props.handleOverlayClick;
    const stopPropagation = this.props.stopPropagation;

    const loginUsername = this.state.loginUsername;
    const loginPassword = this.state.loginPassword;
    const signUpUsername = this.state.signUpUsername;
    const signUpPassword = this.state.signUpPassword;
    const signUpPasswordSecondary = this.state.signUpPasswordSecondary;
    const changeUsername = this.state.changeUsername;
    const changePassword = this.state.changePassword;
    const changeNewPassword = this.state.changeNewPassword;
    const changeNewPasswordSecondary = this.state.changeNewPasswordSecondary;

    let form;

    if (loggingIn) {
      form =
        <div id="formOverlay" onClick={handleOverlayClick} >
          <form id="loginForm"
            name="loginForm"
            onSubmit={this.handleLoginSubmit}
            action="/login"
            method="POST"
            className="mainForm"
            onClick={stopPropagation}
          >
            <p class="clearfix">
              <label htmlFor="username">Username: </label>
              <input id="user" type="text" name="username" placeholder="username" value={loginUsername} onChange={this.handleLoginUsernameChange} />
            </p>
            <p class="clearfix">
              <label htmlFor="pass">Password: </label>
              <input id="pass" type="password" name="pass" placeholder="password" value={loginPassword} onChange={this.handleLoginPasswordChange} />
            </p>
            <input type="hidden" name="_csrf" value={csrf} />
            <p class="clearfix">
              <input className="formSubmit" type="submit" value="Sign In" />
            </p>
            <p class="clearfix">
              <div id="changePasswordButton" onClick={handleChangePasswordClick}>
                <span>Change Password</span>
              </div>
            </p>
            <p class="clearfix">
              {this.state.loginErrorMessage !== '' &&
                <div className="errorBox">{this.state.loginErrorMessage}</div>
              }
            </p>
          </form>
        </div>;
    } else if (signingUp) {
      form =
        <div id="formOverlay" onClick={handleOverlayClick} >
          <form id="signupForm"
            name="signupForm"
            onSubmit={this.handleSignUpSubmit}
            action="/signup"
            method="POST"
            className="mainForm"
            onClick={stopPropagation}
          >
            <p class="clearfix">
              <label htmlFor="username">Username: </label>
              <input id="user" type="text" name="username" placeholder="username" value={signUpUsername} onChange={this.handleSignUpUsernameChange} />
            </p>
            <p class="clearfix">
              <label htmlFor="pass">Password: </label>
              <input id="pass" type="password" name="pass" placeholder="password" value={signUpPassword} onChange={this.handleSignUpPasswordChange} />
            </p>
            <p class="clearfix">
              <label htmlFor="pass2">Password: </label>
              <input id="pass2" type="password" name="pass2" placeholder="retype password" value={signUpPasswordSecondary} onChange={this.handleSignUpPasswordSecondaryChange} />
            </p>
            <input type="hidden" name="_csrf" value={csrf} />
            <p class="clearfix">
              <input className="formSubmit" type="submit" value="Sign Up" />
            </p>
            <p class="clearfix">
              {this.state.signUpErrorMessage !== '' &&
                <div className="errorBox">{this.state.signUpErrorMessage}</div>
              }
            </p>
          </form>
        </div>;
    } else if (changingPassword) {
      form =
        <div id="formOverlay" onClick={handleOverlayClick} >
          <form id="changeForm"
            name="changeForm"
            onSubmit={this.handleChangePasswordSubmit}
            action="/changePassword"
            method="POST"
            className="mainForm"
            onClick={stopPropagation}
          >
            <p class="clearfix">
              <label htmlFor="username">Username: </label>
              <input id="user" type="text" name="username" placeholder="username" value={changeUsername} onChange={this.handleChangeUsernameChange} />
            </p>
            <p class="clearfix">
              <label htmlFor="pass">Password: </label>
              <input id="pass" type="password" name="pass" placeholder="password" value={changePassword} onChange={this.handleChangePasswordChange} />
            </p>
            <p class="clearfix">
              <label htmlFor="newpass1">New Password: </label>
              <input id="newpass1" type="password" name="newpass1" placeholder="type new password" value={changeNewPassword} onChange={this.handleChangeNewPasswordChange} />
            </p>
            <p class="clearfix">
              <label htmlFor="newpass2">New Password: </label>
              <input id="newpass2" type="password" name="newpass2" placeholder="retype new password" value={changeNewPasswordSecondary} onChange={this.handleChangeNewPasswordSecondaryChange} />
            </p>
            <input type="hidden" name="_csrf" value={csrf} />
            <p class="clearfix">
              <input className="formSubmit" type="submit" value="Change Password" />
            </p>
            <p class="clearfix">
              {this.state.changeErrorMessage !== '' &&
                <div className="errorBox">{this.state.changeErrorMessage}</div>
              }
            </p>
          </form>
        </div>;
    }

    return (
      <div id="form">
        {form}
      </div>
    )
  };
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false,
      signingUp: false,
      changingPassword: false,
    };

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleChangePasswordClick = this.handleChangePasswordClick.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleSignInClick() {
    this.setState({
      loggingIn: true,
      signingUp: false,
      changingPassword: false,
    });
  }

  handleSignUpClick() {
    this.setState({
      loggingIn: false,
      signingUp: true,
      changingPassword: false,
    });
  }

  handleChangePasswordClick() {
    this.setState({
      loggingIn: false,
      signingUp: false,
      changingPassword: true,
    });
  }

  handleOverlayClick() {
    this.setState({
      loggingIn: false,
      signingUp: false,
      changingPassword: false,
    });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const loggingIn = this.state.loggingIn;
    const signingUp = this.state.signingUp;
    const changingPassword = this.state.changingPassword;
    const csrf = this.props.csrf;

    return (
      <div id="page">
        <Header
          handleSignInClick={this.handleSignInClick}
          handleSignUpClick={this.handleSignUpClick}
        />
        <Content />
        <Form
          csrf={csrf}
          loggingIn={loggingIn}
          signingUp={signingUp}
          changingPassword={changingPassword}
          handleChangePasswordClick={this.handleChangePasswordClick}
          handleOverlayClick={this.handleOverlayClick}
          stopPropagation={this.stopPropagation}
        />
      </div>
    );
  };
}

const renderPage = (csrf) => {
  ReactDOM.render(
    <Page csrf={csrf} />,
    document.querySelector("#app")
  );
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    renderPage(result.csrfToken);
  });
};

$(document).ready(() => {
  getToken();
});
