"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Landing page for default users
// Displays information about the application and sign in / sign up links
var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var handleSignInClick = this.props.handleSignInClick;
      var handleSignUpClick = this.props.handleSignUpClick;

      return React.createElement(
        "div",
        { id: "header" },
        React.createElement(
          "a",
          { href: "/", className: "headerProjectName" },
          "dynalytic"
        ),
        React.createElement(
          "button",
          { className: "signInLink", onClick: handleSignInClick },
          "Sign In"
        ),
        React.createElement(
          "button",
          { className: "signUpLink", onClick: handleSignUpClick },
          "Sign Up"
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var Content = function (_React$Component2) {
  _inherits(Content, _React$Component2);

  function Content(props) {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));
  }

  _createClass(Content, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "content" },
        React.createElement(
          "h1",
          { className: "appName" },
          "dynalytic"
        ),
        React.createElement(
          "h2",
          { className: "appTagline" },
          "Visualize your data"
        ),
        React.createElement(
          "div",
          { className: "appDescription" },
          "Dynalytic allows users to upload their datasets and quickly create helpful visualizations to better understand them. Simply upload a csv file, provide extra information as neccesary, and manipulate the data into useful representations in minutes. Dynalytic has the tools for you to add, remove, and modify datasets to make the data work for you. Create an account to get started!"
        )
      );
    }
  }]);

  return Content;
}(React.Component);

var Form = function (_React$Component3) {
  _inherits(Form, _React$Component3);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this3 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this3.state = {
      loginUsername: '',
      loginPassword: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpPasswordSecondary: '',
      loginErrorMessage: '',
      signUpErrorMessage: ''
    };

    _this3.handleLoginSubmit = _this3.handleLoginSubmit.bind(_this3);
    _this3.handleSignUpSubmit = _this3.handleSignUpSubmit.bind(_this3);

    _this3.handleLoginUsernameChange = _this3.handleLoginUsernameChange.bind(_this3);
    _this3.handleLoginPasswordChange = _this3.handleLoginPasswordChange.bind(_this3);
    _this3.handleSignUpUsernameChange = _this3.handleSignUpUsernameChange.bind(_this3);
    _this3.handleSignUpPasswordChange = _this3.handleSignUpPasswordChange.bind(_this3);
    _this3.handleSignUpPasswordSecondaryChange = _this3.handleSignUpPasswordSecondaryChange.bind(_this3);

    _this3.displayLoginError = _this3.displayLoginError.bind(_this3);
    _this3.displaySignupError = _this3.displaySignupError.bind(_this3);
    return _this3;
  }

  _createClass(Form, [{
    key: "handleLoginSubmit",
    value: function handleLoginSubmit(e) {
      var _this4 = this;

      e.preventDefault();

      if (this.state.loginUsername == '' || this.state.loginPassword == '') {
        this.displayLoginError('Enter a username and password');
        return false;
      }

      this.sendAjaxDisplayError('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect, function (xhr, status, error) {
        var messageObj = JSON.parse(xhr.responseText);
        _this4.displayLoginError(messageObj.error);
      });

      return false;
    }
  }, {
    key: "handleSignUpSubmit",
    value: function handleSignUpSubmit(e) {
      var _this5 = this;

      e.preventDefault();

      if (this.state.signUpUsername == '' || this.state.signUpPassword == '' || this.state.signUpPasswordSecondary == '') {
        this.displaySignupError('All fields are required for signing up.');
        return false;
      }

      if (this.state.signUpPassword !== this.state.signUpPasswordSecondary) {
        this.displaySignupError('The passwords entered do not match.');
        return false;
      }

      this.sendAjaxDisplayError('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect, function (xhr, status, error) {
        var messageObj = JSON.parse(xhr.responseText);
        _this5.displaySignupError(messageObj.error);
      });

      return false;
    }
  }, {
    key: "sendAjaxDisplayError",
    value: function sendAjaxDisplayError(type, action, data, success, error) {
      $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: error
      });
    }
  }, {
    key: "handleLoginUsernameChange",
    value: function handleLoginUsernameChange(e) {
      this.setState({
        loginUsername: e.target.value
      });
    }
  }, {
    key: "handleLoginPasswordChange",
    value: function handleLoginPasswordChange(e) {
      this.setState({
        loginPassword: e.target.value
      });
    }
  }, {
    key: "handleSignUpUsernameChange",
    value: function handleSignUpUsernameChange(e) {
      this.setState({
        signUpUsername: e.target.value
      });
    }
  }, {
    key: "handleSignUpPasswordChange",
    value: function handleSignUpPasswordChange(e) {
      this.setState({
        signUpPassword: e.target.value
      });
    }
  }, {
    key: "handleSignUpPasswordSecondaryChange",
    value: function handleSignUpPasswordSecondaryChange(e) {
      this.setState({
        signUpPasswordSecondary: e.target.value
      });
    }
  }, {
    key: "displayLoginError",
    value: function displayLoginError(message) {
      this.setState({
        loginErrorMessage: message
      });
    }
  }, {
    key: "displaySignupError",
    value: function displaySignupError(message) {
      this.setState({
        signUpErrorMessage: message
      });
    }
  }, {
    key: "render",
    value: function render() {
      var loggingIn = this.props.loggingIn;
      var signingUp = this.props.signingUp;
      var csrf = this.props.csrf;
      var handleOverlayClick = this.props.handleOverlayClick;
      var stopPropagation = this.props.stopPropagation;

      var loginUsername = this.state.loginUsername;
      var loginPassword = this.state.loginPassword;
      var signUpUsername = this.state.signUpUsername;
      var signUpPassword = this.state.signUpPassword;
      var signUpPasswordSecondary = this.state.signUpPasswordSecondary;

      var form = void 0;

      if (loggingIn) {
        form = React.createElement(
          "div",
          { id: "formOverlay", onClick: handleOverlayClick },
          React.createElement(
            "form",
            { id: "loginForm",
              name: "loginForm",
              onSubmit: this.handleLoginSubmit,
              action: "/login",
              method: "POST",
              className: "mainForm",
              onClick: stopPropagation
            },
            React.createElement(
              "p",
              { "class": "clearfix" },
              React.createElement(
                "label",
                { htmlFor: "username" },
                "Username: "
              ),
              React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username", value: loginUsername, onChange: this.handleLoginUsernameChange })
            ),
            React.createElement(
              "p",
              { "class": "clearfix" },
              React.createElement(
                "label",
                { htmlFor: "pass" },
                "Password: "
              ),
              React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password", value: loginPassword, onChange: this.handleLoginPasswordChange })
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
            React.createElement(
              "p",
              { "class": "clearfix" },
              React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign In" })
            ),
            React.createElement(
              "p",
              { "class": "clearfix" },
              this.state.loginErrorMessage !== '' && React.createElement(
                "div",
                { className: "errorBox" },
                this.state.loginErrorMessage
              )
            )
          )
        );
      } else if (signingUp) {
        form = React.createElement(
          "div",
          { id: "formOverlay", onClick: handleOverlayClick },
          React.createElement(
            "form",
            { id: "signupForm",
              name: "signupForm",
              onSubmit: this.handleSignUpSubmit,
              action: "/signup",
              method: "POST",
              className: "mainForm",
              onClick: stopPropagation
            },
            React.createElement(
              "p",
              { "class": "clearfix" },
              React.createElement(
                "label",
                { htmlFor: "username" },
                "Username: "
              ),
              React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username", value: signUpUsername, onChange: this.handleSignUpUsernameChange })
            ),
            React.createElement(
              "p",
              { "class": "clearfix" },
              React.createElement(
                "label",
                { htmlFor: "pass" },
                "Password: "
              ),
              React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password", value: signUpPassword, onChange: this.handleSignUpPasswordChange })
            ),
            React.createElement(
              "p",
              { "class": "clearfix" },
              React.createElement(
                "label",
                { htmlFor: "pass2" },
                "Password: "
              ),
              React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password", value: signUpPasswordSecondary, onChange: this.handleSignUpPasswordSecondaryChange })
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
            React.createElement(
              "p",
              { "class": "clearfix" },
              React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
            ),
            React.createElement(
              "p",
              { "class": "clearfix" },
              this.state.signUpErrorMessage !== '' && React.createElement(
                "div",
                { className: "errorBox" },
                this.state.signUpErrorMessage
              )
            )
          )
        );
      }

      return React.createElement(
        "div",
        { id: "form" },
        form
      );
    }
  }]);

  return Form;
}(React.Component);

var Page = function (_React$Component4) {
  _inherits(Page, _React$Component4);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this6 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this6.state = {
      loggingIn: false,
      signingUp: false
    };

    _this6.handleSignInClick = _this6.handleSignInClick.bind(_this6);
    _this6.handleSignUpClick = _this6.handleSignUpClick.bind(_this6);
    _this6.handleOverlayClick = _this6.handleOverlayClick.bind(_this6);
    return _this6;
  }

  _createClass(Page, [{
    key: "handleSignInClick",
    value: function handleSignInClick() {
      this.setState({
        loggingIn: true,
        signingUp: false
      });
    }
  }, {
    key: "handleSignUpClick",
    value: function handleSignUpClick() {
      this.setState({
        loggingIn: false,
        signingUp: true
      });
    }
  }, {
    key: "handleOverlayClick",
    value: function handleOverlayClick() {
      this.setState({
        loggingIn: false,
        signingUp: false
      });
    }
  }, {
    key: "stopPropagation",
    value: function stopPropagation(e) {
      e.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var loggingIn = this.state.loggingIn;
      var signingUp = this.state.signingUp;
      var csrf = this.props.csrf;

      return React.createElement(
        "div",
        { id: "page" },
        React.createElement(Header, { handleSignInClick: this.handleSignInClick, handleSignUpClick: this.handleSignUpClick }),
        React.createElement(Content, null),
        React.createElement(Form, { csrf: csrf, loggingIn: loggingIn, signingUp: signingUp, handleOverlayClick: this.handleOverlayClick, stopPropagation: this.stopPropagation })
      );
    }
  }]);

  return Page;
}(React.Component);

var renderPage = function renderPage(csrf) {
  ReactDOM.render(React.createElement(Page, { csrf: csrf }), document.querySelector("#app"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    renderPage(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

var handleError = function handleError(message) {
  //Change client to reflect error message
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};