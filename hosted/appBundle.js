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
    key: "submitCSV",
    value: function submitCSV(csrf) {
      var csvFile = $('#csvUpload')[0].files[0];
      var datasetName = $('#datasetName')[0].value;

      if (!csvFile) {
        console.dir('No file selected');
        // Throw clientside error 'No file selected'
        return;
      }

      var reader = new FileReader();
      reader.readAsText(csvFile);
      reader.onload = function (e) {
        var csv = e.target.result;
        var data = $.csv.toObjects(csv);
        console.dir(data);

        //Disable submit button while submitting
        $('#csvButton').attr('disabled', 'disabled');

        // Send array of csv objects to the server
        $.ajax({
          type: "POST",
          url: '/upload',
          data: {
            _csrf: csrf,
            csvData: data,
            datasetName: datasetName
          },
          success: function success() {
            $('#csvButton').removeAttr('disabled');
            // Update screen to reflect upload status
          }
        }).error(function () {
          $('#csvButton').removeAttr('disabled');
          // Update screen to reflect upload status
        });
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var csrf = this.props.csrf;
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
            ),
            React.createElement("input", { id: "csvUpload", type: "file", accept: ".csv" }),
            React.createElement("input", { id: "datasetName", type: "text", placeholder: "Dataset name" }),
            React.createElement(
              "button",
              { id: "csvButton", type: "button", onClick: function onClick() {
                  return _this3.submitCSV(csrf);
                } },
              "Upload CSV"
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
      var csrf = this.props.csrf;

      return React.createElement(
        "div",
        { id: "page" },
        React.createElement(Header, { handleLogoutClick: this.handleLogoutClick }),
        React.createElement(Content, { csrf: csrf })
      );
    }
  }]);

  return Page;
}(React.Component);

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    renderPage(result.csrfToken);
  });
};

var renderPage = function renderPage(csrf) {
  ReactDOM.render(React.createElement(Page, { csrf: csrf }), document.querySelector("#app"));
};

var submitCSV = function submitCSV() {
  console.dir('Pressed it');

  var csvFile = $('#csvFile')[0].files[0];

  if (!csvFile) {
    console.dir('No file selected');
    // Throw clientside error 'No file selected'
    return;
  }

  //Disable submit button while submitting
  $('#csvButton').attr('disabled', 'disabled');

  //Parse CSV 
  var csvJSON = parseCSVToJSON(csvFile);

  //Send JSON to server
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    $('#csvButton').removeAttr('disabled');
    // Update screen to reflect upload status
    console.dir('Ayy lmao');
  };

  xhr.open('POST', '/upload');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(csvJSON));
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