"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Main app page
// Page for main application
var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var handleLogoutClick = this.props.handleLogoutClick;

      return React.createElement(
        "div",
        { id: "header" },
        React.createElement(
          "a",
          { href: "/app", className: "headerProjectName" },
          "dynalytic"
        ),
        React.createElement(
          "a",
          { href: "/logout", className: "logoutLink" },
          "Logout"
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

    var _this2 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    _this2.state = {
      selectedPage: "home"
    };

    _this2.selectPage = _this2.selectPage.bind(_this2);
    return _this2;
  }

  _createClass(Content, [{
    key: "selectPage",
    value: function selectPage(pageName) {
      this.setState({ selectedPage: pageName });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var page = void 0;

      switch (this.state.selectedPage) {
        case "home":
          page = React.createElement(
            "div",
            { id: "homePage", className: "selectedDashboardPage" },
            React.createElement(
              "h1",
              null,
              "Hiya!"
            )
          );
          break;
        case "addData":
          page = React.createElement(
            "div",
            { id: "addDataPage", className: "selectedDashboardPage" },
            React.createElement(
              "h1",
              null,
              "Add some data"
            )
          );
          break;
        case "myData":
          page = React.createElement(
            "div",
            { id: "myDataPage", className: "selectedDashboardPage" },
            React.createElement(
              "h1",
              null,
              "Here's your data"
            )
          );
          break;
        case "analytics":
          page = React.createElement(
            "div",
            { id: "analyticsPage", className: "selectedDashboardPage" },
            React.createElement(
              "h1",
              null,
              "Analytics here!"
            )
          );
          break;
        default:
          break;
      }

      return React.createElement(
        "div",
        { id: "content" },
        React.createElement(
          "div",
          { id: "dashboard" },
          React.createElement(
            "div",
            { id: "sidebar" },
            React.createElement(
              "div",
              {
                className: "sidebarItem " + (this.state.selectedPage === 'home' ? 'selectedSidebarItem' : ''),
                onClick: function onClick() {
                  return _this3.selectPage('home');
                }
              },
              React.createElement(
                "span",
                { className: "sidebarSpan" },
                "Home"
              )
            ),
            React.createElement(
              "div",
              {
                className: "sidebarItem " + (this.state.selectedPage === 'addData' ? 'selectedSidebarItem' : ''),
                onClick: function onClick() {
                  return _this3.selectPage('addData');
                }
              },
              React.createElement(
                "span",
                { className: "sidebarSpan" },
                "Add Datasets"
              )
            ),
            React.createElement(
              "div",
              {
                className: "sidebarItem " + (this.state.selectedPage === 'myData' ? 'selectedSidebarItem' : ''),
                onClick: function onClick() {
                  return _this3.selectPage('myData');
                }
              },
              React.createElement(
                "span",
                { className: "sidebarSpan" },
                "My Datasets"
              )
            ),
            React.createElement(
              "div",
              {
                className: "sidebarItem " + (this.state.selectedPage === 'analytics' ? 'selectedSidebarItem' : ''),
                onClick: function onClick() {
                  return _this3.selectPage('analytics');
                }
              },
              React.createElement(
                "span",
                { className: "sidebarSpan" },
                "Analytics"
              )
            )
          ),
          React.createElement(
            "div",
            { id: "dashboardPage" },
            page
          )
        )
      );
    }
  }]);

  return Content;
}(React.Component);

var Page = function (_React$Component3) {
  _inherits(Page, _React$Component3);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this4 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this4.state = {};

    return _this4;
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { id: "page" },
        React.createElement(Header, { handleLogoutClick: this.handleLogoutClick }),
        React.createElement(Content, null)
      );
    }
  }]);

  return Page;
}(React.Component);

var renderPage = function renderPage(csrf) {
  ReactDOM.render(React.createElement(Page, null), document.querySelector("#app"));
};

$(document).ready(function () {
  renderPage();
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