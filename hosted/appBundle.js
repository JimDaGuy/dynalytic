"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

var WelcomeHome = function (_React$Component2) {
  _inherits(WelcomeHome, _React$Component2);

  function WelcomeHome(props) {
    _classCallCheck(this, WelcomeHome);

    var _this2 = _possibleConstructorReturn(this, (WelcomeHome.__proto__ || Object.getPrototypeOf(WelcomeHome)).call(this, props));

    _this2.state = {};
    return _this2;
  }

  _createClass(WelcomeHome, [{
    key: "render",
    value: function render() {
      return React.createElement("div", { id: "welcomeContainer" });
    }
  }]);

  return WelcomeHome;
}(React.Component);

var AddDataset = function (_React$Component3) {
  _inherits(AddDataset, _React$Component3);

  function AddDataset(props) {
    _classCallCheck(this, AddDataset);

    var _this3 = _possibleConstructorReturn(this, (AddDataset.__proto__ || Object.getPrototypeOf(AddDataset)).call(this, props));

    _this3.state = {};
    return _this3;
  }

  _createClass(AddDataset, [{
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
      var _this4 = this;

      var csrf = this.props.csrf;

      return React.createElement(
        "div",
        { id: "addDataContainer" },
        React.createElement(
          "span",
          { id: "addDataSubheading" },
          "Upload a CSV file, enter a dataset name, and click create!"
        ),
        React.createElement(
          "label",
          { id: "datasetNameLabel" },
          "Dataset Name:"
        ),
        React.createElement("input", { id: "datasetName", type: "text", placeholder: "Dataset name" }),
        React.createElement(
          "label",
          { id: "csvUploadContainer" },
          React.createElement("img", { id: "csvUploadIcon", src: "/assets/img/upload_icon.png" }),
          React.createElement(
            "span",
            { id: "csvUploadSpan" },
            "Upload"
          ),
          React.createElement("input", { id: "csvUpload", type: "file", accept: ".csv" })
        ),
        React.createElement(
          "button",
          { id: "csvButton", type: "button", onClick: function onClick() {
              return _this4.submitCSV(csrf);
            } },
          "Create Dataset"
        )
      );
    }
  }]);

  return AddDataset;
}(React.Component);

var DatasetList = function (_React$Component4) {
  _inherits(DatasetList, _React$Component4);

  function DatasetList(props) {
    _classCallCheck(this, DatasetList);

    var _this5 = _possibleConstructorReturn(this, (DatasetList.__proto__ || Object.getPrototypeOf(DatasetList)).call(this, props));

    _this5.state = {};
    return _this5;
  }

  _createClass(DatasetList, [{
    key: "downloadDataset",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, datasetName) {
        var result, element;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return $.ajax({
                  type: "GET",
                  url: '/getDatasetCSV',
                  data: {
                    datasetID: id
                  }
                });

              case 2:
                result = _context.sent;


                // Borrowed from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
                element = document.createElement('a');

                element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(result));
                element.setAttribute('download', datasetName + ".csv");

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function downloadDataset(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return downloadDataset;
    }()
  }, {
    key: "removeDataset",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var _this6 = this;

        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return $.ajax({
                  type: 'DELETE',
                  url: '/removeDataset',
                  data: {
                    datasetID: id,
                    _csrf: this.props.csrf
                  },
                  success: function success() {
                    _this6.props.getUserDatasets();
                  }
                });

              case 2:
                result = _context2.sent;


                console.dir(result);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeDataset(_x3) {
        return _ref2.apply(this, arguments);
      }

      return removeDataset;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var userDatasets = this.props.userDatasets;

      return React.createElement(
        "div",
        { id: "datasetListContainer" },
        userDatasets.map(function (dataset) {
          return React.createElement(
            "div",
            { className: "datasetListItem" },
            React.createElement(
              "span",
              { className: "datasetListItemSpan datasetListItemName" },
              dataset.datasetName
            ),
            React.createElement(
              "span",
              { className: "datasetListItemSpan datasetListItemDate" },
              "Last edited: ",
              new Date(dataset.lastEdited).toDateString()
            ),
            React.createElement(
              "span",
              { className: "datasetListItemSpan datasetListItemLink" },
              "View"
            ),
            React.createElement(
              "span",
              { className: "datasetListItemSpan datasetListItemLink", onClick: function onClick() {
                  _this7.downloadDataset(dataset._id, dataset.datasetName);
                } },
              "Download"
            ),
            React.createElement(
              "span",
              { className: "datasetListItemSpan datasetListItemLink", onClick: function onClick() {
                  _this7.removeDataset(dataset._id);
                } },
              "Delete"
            )
          );
        })
      );
    }
  }]);

  return DatasetList;
}(React.Component);

var Analytics = function (_React$Component5) {
  _inherits(Analytics, _React$Component5);

  function Analytics(props) {
    _classCallCheck(this, Analytics);

    var _this8 = _possibleConstructorReturn(this, (Analytics.__proto__ || Object.getPrototypeOf(Analytics)).call(this, props));

    _this8.state = {};
    return _this8;
  }

  _createClass(Analytics, [{
    key: "render",
    value: function render() {
      return React.createElement("div", { id: "analyticsContainer" });
    }
  }]);

  return Analytics;
}(React.Component);

var Content = function (_React$Component6) {
  _inherits(Content, _React$Component6);

  function Content(props) {
    _classCallCheck(this, Content);

    var _this9 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    _this9.state = {
      selectedPage: "home",
      userDatasets: []
    };

    _this9.selectPage = _this9.selectPage.bind(_this9);
    _this9.getUserDatasets = _this9.getUserDatasets.bind(_this9);
    return _this9;
  }

  _createClass(Content, [{
    key: "selectPage",
    value: function selectPage(pageName) {
      this.setState({ selectedPage: pageName });
      if (pageName === "myData") {
        this.getUserDatasets();
      }
    }
  }, {
    key: "getUserDatasets",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this10 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return $.ajax({
                  type: "GET",
                  url: '/getDatasetList',
                  success: function success(response) {
                    response = JSON.parse(response);
                    _this10.setState({ userDatasets: response.datasets });
                  },
                  error: function error(err) {
                    console.dir(err);
                  }
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUserDatasets() {
        return _ref3.apply(this, arguments);
      }

      return getUserDatasets;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

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
              "Welcome!"
            ),
            React.createElement(WelcomeHome, null)
          );
          break;
        case "addData":
          page = React.createElement(
            "div",
            { id: "addDataPage", className: "selectedDashboardPage" },
            React.createElement(
              "h1",
              null,
              "Create a dataset"
            ),
            React.createElement(AddDataset, { csrf: csrf })
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
            ),
            React.createElement(DatasetList, { csrf: csrf, getUserDatasets: this.getUserDatasets, userDatasets: this.state.userDatasets })
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
            ),
            React.createElement(Analytics, null)
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
                  return _this11.selectPage('home');
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
                  return _this11.selectPage('addData');
                }
              },
              React.createElement(
                "span",
                { className: "sidebarSpan" },
                "Create Datasets"
              )
            ),
            React.createElement(
              "div",
              {
                className: "sidebarItem " + (this.state.selectedPage === 'myData' ? 'selectedSidebarItem' : ''),
                onClick: function onClick() {
                  return _this11.selectPage('myData');
                }
              },
              React.createElement(
                "span",
                { className: "sidebarSpan" },
                "View Datasets"
              )
            ),
            React.createElement(
              "div",
              {
                className: "sidebarItem " + (this.state.selectedPage === 'analytics' ? 'selectedSidebarItem' : ''),
                onClick: function onClick() {
                  return _this11.selectPage('analytics');
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

var Page = function (_React$Component7) {
  _inherits(Page, _React$Component7);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this12 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this12.state = {};

    return _this12;
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {
      var csrf = this.props.csrf;

      return React.createElement(
        "div",
        { id: "page" },
        React.createElement(Header, { handleLogoutClick: this.handleLogoutClick }),
        React.createElement(Content, { csrf: csrf }),
        React.createElement("div", { id: "footer" })
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