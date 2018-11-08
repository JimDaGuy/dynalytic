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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
           ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Duis aute irure dolor in reprehenderit in voluptate velit
           esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
           occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
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
    }

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);

    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleSignUpUsernameChange = this.handleSignUpUsernameChange.bind(this);
    this.handleSignUpPasswordChange = this.handleSignUpPasswordChange.bind(this);
    this.handleSignUpPasswordSecondaryChange = this.handleSignUpPasswordSecondaryChange.bind(this);
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    if (this.state.loginUsername == '' || this.state.loginPassword == '') {
      console.log("Login fields required");
      // handleError("RAWR! Username or password is empty");
      return false;
    }

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
  }

  handleSignUpSubmit(e) {
    e.preventDefault();

    if (this.state.signUpUsername == '' || this.state.signUpPassword == '' || this.state.signUpPasswordSecondary == '') {
      console.log("Fields required");
      // handleError("RAWR: All fields are required");
      return false;
    }

    if (this.state.signUpPassword !== this.state.signUpPasswordSecondary) {
      console.log("Pw dont match");
      // handleError("RAWR! Passwords do not match");
      return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
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

  render() {
    const loggingIn = this.props.loggingIn;
    const signingUp = this.props.signingUp;
    const csrf = this.props.csrf;
    const handleOverlayClick = this.props.handleOverlayClick;
    const stopPropagation = this.props.stopPropagation;

    const loginUsername = this.state.loginUsername;
    const loginPassword = this.state.loginPassword;
    const signUpUsername = this.state.signUpUsername;
    const signUpPassword = this.state.signUpPassword;
    const signUpPasswordSecondary = this.state.signUpPasswordSecondary;

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
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" value={loginUsername} onChange={this.handleLoginUsernameChange} />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" value={loginPassword} onChange={this.handleLoginPasswordChange} />
            <input type="hidden" name="_csrf" value={csrf} />
            <input className="formSubmit" type="submit" value="Sign In" />
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
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" value={signUpUsername} onChange={this.handleSignUpUsernameChange} />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" value={signUpPassword} onChange={this.handleSignUpPasswordChange} />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" value={signUpPasswordSecondary} onChange={this.handleSignUpPasswordSecondaryChange} />
            <input type="hidden" name="_csrf" value={csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
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
    };

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleSignInClick() {
    this.setState({
      loggingIn: true,
      signingUp: false,
    });
  }

  handleSignUpClick() {
    this.setState({
      loggingIn: false,
      signingUp: true,
    });
  }

  handleOverlayClick() {
    this.setState({
      loggingIn: false,
      signingUp: false,
    });
  }

  stopPropagation (e) {
    e.stopPropagation();
  }

  render() {
    const loggingIn = this.state.loggingIn;
    const signingUp = this.state.signingUp;
    const csrf = this.props.csrf;

    return (
      <div id="page">
        <Header handleSignInClick={this.handleSignInClick} handleSignUpClick={this.handleSignUpClick} />
        <Content />
        <Form csrf={csrf} loggingIn={loggingIn} signingUp={signingUp} handleOverlayClick={this.handleOverlayClick} stopPropagation={this.stopPropagation} />
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
  renderPage();
  getToken();
});
