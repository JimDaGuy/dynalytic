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
          Dynalytic allows users to upload their datasets and quickly 
          create helpful visualizations to better understand them. Simply upload
          a csv file, provide extra information as neccesary, and manipulate
          the data into useful representations in minutes. 
          Dynalytic has the tools for you to add, remove, and modify datasets
          to make the data work for you. Create an account to get started!
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
      loginErrorMessage: '',
      signUpErrorMessage: '',
    }

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);

    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleSignUpUsernameChange = this.handleSignUpUsernameChange.bind(this);
    this.handleSignUpPasswordChange = this.handleSignUpPasswordChange.bind(this);
    this.handleSignUpPasswordSecondaryChange = this.handleSignUpPasswordSecondaryChange.bind(this);
  
    this.displayLoginError = this.displayLoginError.bind(this);
    this.displaySignupError = this.displaySignupError.bind(this);
  }

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
  getToken();
});
