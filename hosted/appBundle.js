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
      return React.createElement(
        "div",
        { id: "welcomeContainer" },
        React.createElement(
          "h2",
          { id: "welcomeSubheading" },
          "Welcome to dynalytic"
        ),
        React.createElement(
          "span",
          { id: "welcomeDesc" },
          "Upload some data to get started!"
        )
      );
    }
  }]);

  return WelcomeHome;
}(React.Component);

var AddDataset = function (_React$Component3) {
  _inherits(AddDataset, _React$Component3);

  function AddDataset(props) {
    _classCallCheck(this, AddDataset);

    var _this3 = _possibleConstructorReturn(this, (AddDataset.__proto__ || Object.getPrototypeOf(AddDataset)).call(this, props));

    _this3.state = {
      fileUploaded: false,
      createMessage: '',
      error: false
    };

    _this3.updateUpload = _this3.updateUpload.bind(_this3);
    _this3.submitCSV = _this3.submitCSV.bind(_this3);
    return _this3;
  }

  // submitCSV:
  // - Grab file from file input, convert it to json, send it to the server
  // //////////////////////////////


  _createClass(AddDataset, [{
    key: "submitCSV",
    value: function submitCSV(csrf) {
      var _this4 = this;

      var csvFile = $('#csvUpload')[0].files[0];
      var datasetName = $('#datasetName')[0].value;

      // Check that the user has uploaded a CSV
      if (!csvFile) {
        this.setState({
          createMessage: 'No file selected',
          error: true
        });
        return;
      }

      // Read in the CSV file
      var reader = new FileReader();
      reader.readAsText(csvFile);
      reader.onload = function (e) {
        // Convert CSV to JSON object with JQuery CSV
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
          success: function success(result) {
            $('#csvButton').removeAttr('disabled');
            _this4.setState({
              createMessage: result.message,
              error: false
            });
          }
        }).error(function (err) {
          $('#csvButton').removeAttr('disabled');
          _this4.setState({
            createMessage: err.responseJSON.error,
            error: true
          });
        });
      };
    }
  }, {
    key: "updateUpload",


    // updateUpload:
    // - Change appearance of upload button when a file is uploaded
    // //////////////////////////////
    value: function updateUpload() {
      var csvFile = $('#csvUpload')[0].files[0];

      // If a file is uploaded add a different class to it, else remove it
      if (csvFile) {
        this.setState({ fileUploaded: true });
      } else {
        this.setState({ fileUploaded: false });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var csrf = this.props.csrf;
      var createMessage = this.state.createMessage;
      var error = this.state.error;

      return React.createElement(
        "div",
        { id: "addDataContainer" },
        React.createElement(
          "h2",
          { id: "addDataSubheading" },
          "Upload a CSV file, enter a name, and click create!"
        ),
        React.createElement("input", { id: "datasetName", type: "text", placeholder: "Dataset name" }),
        React.createElement(
          "label",
          { id: "csvUploadContainer", className: this.state.fileUploaded ? 'uploadedCSV' : null },
          React.createElement("img", { id: "csvUploadIcon", src: "/assets/img/upload_icon.png" }),
          React.createElement(
            "span",
            { id: "csvUploadSpan" },
            "Upload"
          ),
          React.createElement("input", { id: "csvUpload", type: "file", accept: ".csv", onChange: this.updateUpload })
        ),
        React.createElement(
          "button",
          { id: "csvButton", type: "button", onClick: function onClick() {
              return _this5.submitCSV(csrf);
            } },
          "Create Dataset"
        ),
        createMessage !== '' && React.createElement(
          "div",
          { id: "statusBoxContainer" },
          !error ? React.createElement(
            "div",
            { className: "addStatusBox successAdd" },
            createMessage
          ) : React.createElement(
            "div",
            { className: "addStatusBox errorAdd" },
            createMessage
          )
        )
      );
    }
  }]);

  return AddDataset;
}(React.Component);

var ConditionList = function (_React$Component4) {
  _inherits(ConditionList, _React$Component4);

  function ConditionList(props) {
    _classCallCheck(this, ConditionList);

    var _this6 = _possibleConstructorReturn(this, (ConditionList.__proto__ || Object.getPrototypeOf(ConditionList)).call(this, props));

    _this6.state = {};
    return _this6;
  }

  _createClass(ConditionList, [{
    key: "render",
    value: function render() {
      var conditions = this.props.conditions;
      var removeCondition = this.props.removeCondition;

      return React.createElement(
        "div",
        { id: "conditionsList" },
        React.createElement(
          "div",
          { id: "conditionsListLabelContainer" },
          React.createElement(
            "div",
            { className: "conditionsLabel" },
            "Column"
          ),
          React.createElement(
            "div",
            { className: "conditionsLabel" },
            "Type"
          ),
          React.createElement(
            "div",
            { className: "conditionsLabel" },
            "Value"
          )
        ),
        conditions.map(function (condition, index) {
          var col = condition.col;
          var value = condition.value;
          var type = condition.type;

          return React.createElement(
            "div",
            { id: "conditionsListItemContainer" },
            React.createElement(
              "div",
              { className: "conditionsListEntry" },
              col
            ),
            React.createElement(
              "div",
              { className: "conditionsListEntry" },
              type
            ),
            React.createElement(
              "div",
              { className: "conditionsListEntry" },
              value
            ),
            React.createElement(
              "div",
              { className: "conditionsListRemoveButton", onClick: function onClick() {
                  return removeCondition(index);
                } },
              "Remove"
            )
          );
        })
      );
    }
  }]);

  return ConditionList;
}(React.Component);

var AddCondition = function (_React$Component5) {
  _inherits(AddCondition, _React$Component5);

  function AddCondition(props) {
    _classCallCheck(this, AddCondition);

    var _this7 = _possibleConstructorReturn(this, (AddCondition.__proto__ || Object.getPrototypeOf(AddCondition)).call(this, props));

    _this7.state = {
      selectedColumn: '',
      selectedType: '',
      selectedValue: ''
    };

    _this7.updateColumn = _this7.updateColumn.bind(_this7);
    _this7.updateType = _this7.updateType.bind(_this7);
    _this7.updateValue = _this7.updateValue.bind(_this7);
    _this7.submitCondition = _this7.submitCondition.bind(_this7);
    return _this7;
  }

  _createClass(AddCondition, [{
    key: "updateColumn",
    value: function updateColumn(e) {
      this.setState({
        selectedColumn: e.target.value
      });
    }
  }, {
    key: "updateType",
    value: function updateType(e) {
      this.setState({
        selectedType: e.target.value
      });
    }
  }, {
    key: "updateValue",
    value: function updateValue(e) {
      this.setState({
        selectedValue: e.target.value
      });
    }
  }, {
    key: "submitCondition",
    value: function submitCondition() {
      var col = this.state.selectedColumn;
      var type = this.state.selectedType;
      var value = this.state.selectedValue;

      if (col === '' || type === '' || value === '') {
        return;
      }

      this.props.submitCondition(col, type, value);
    }
  }, {
    key: "render",
    value: function render() {
      var columns = this.props.columns;

      return React.createElement(
        "div",
        { id: "addConditionContainer" },
        React.createElement(
          "div",
          { id: "conditionLabelContainer" },
          React.createElement(
            "label",
            { id: "colSelectLabel", className: "conditionLabel", "for": "colSelect" },
            "Column"
          ),
          React.createElement(
            "label",
            { id: "typeSelectLabel", className: "conditionLabel", "for": "typeSelect" },
            "Type"
          ),
          React.createElement(
            "label",
            { id: "valueInputLabel", className: "conditionLabel", "for": "valueInput" },
            "Value"
          )
        ),
        React.createElement(
          "div",
          { id: "conditionInputContainer" },
          React.createElement(
            "select",
            { className: "conditionInput", id: "colSelect", onChange: this.updateColumn },
            React.createElement(
              "option",
              { disabled: true, selected: true, value: true },
              "Column"
            ),
            columns.map(function (column) {
              return React.createElement(
                "option",
                { value: column },
                column
              );
            })
          ),
          React.createElement(
            "select",
            { className: "conditionInput", id: "typeSelect", onChange: this.updateType },
            React.createElement(
              "option",
              { disabled: true, selected: true, value: true },
              "Restriction"
            ),
            React.createElement(
              "option",
              { value: "equals" },
              "Equals"
            ),
            React.createElement(
              "option",
              { value: "contains" },
              "Contains"
            )
          ),
          React.createElement("input", { className: "conditionInput", type: "text", placeholder: "Enter a value", id: "valueInput", onChange: this.updateValue }),
          React.createElement(
            "button",
            { onClick: this.submitCondition, id: "addConditionButton" },
            "Add"
          )
        )
      );
    }
  }]);

  return AddCondition;
}(React.Component);

var SearchedDataset = function (_React$Component6) {
  _inherits(SearchedDataset, _React$Component6);

  function SearchedDataset(props) {
    _classCallCheck(this, SearchedDataset);

    var _this8 = _possibleConstructorReturn(this, (SearchedDataset.__proto__ || Object.getPrototypeOf(SearchedDataset)).call(this, props));

    _this8.state = {
      datasetID: '',
      datasetName: '',
      columns: [],
      entries: [],
      searchedEntries: [],
      loading: true,
      conditions: [],
      adding: false,
      menu: false
    };

    _this8.getDatasetInfo = _this8.getDatasetInfo.bind(_this8);
    _this8.toggleMenu = _this8.toggleMenu.bind(_this8);
    _this8.toggleAdding = _this8.toggleAdding.bind(_this8);
    _this8.addCondition = _this8.addCondition.bind(_this8);
    _this8.searchEntries = _this8.searchEntries.bind(_this8);
    _this8.removeCondition = _this8.removeCondition.bind(_this8);
    return _this8;
  }

  _createClass(SearchedDataset, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getDatasetInfo();
    }
  }, {
    key: "addCondition",
    value: function addCondition(col, type, value) {
      var condition = {
        col: col,
        type: type,
        value: value
      };

      var newConditions = this.state.conditions;
      newConditions.push(condition);

      this.setState({
        conditions: newConditions,
        adding: false
      });
    }
  }, {
    key: "toggleAdding",
    value: function toggleAdding() {
      this.setState({
        adding: !this.state.adding
      });
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      this.setState({
        menu: !this.state.menu
      });
    }
  }, {
    key: "getDatasetInfo",


    // getDatasetInfo:
    // - Request dataset from the server
    // //////////////////////////////
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this9 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return $.ajax({
                  type: "GET",
                  url: '/getDataset',
                  data: {
                    datasetID: this.props.datasetID
                  },
                  success: function success(response) {
                    response = JSON.parse(response);
                    var dataset = response.dataset;
                    _this9.setState({
                      datasetID: dataset._id,
                      datasetName: dataset.datasetName,
                      columns: dataset.columns,
                      entries: dataset.entries,
                      searchedEntries: dataset.entries,
                      loading: false
                    });
                  },
                  error: function error(err) {
                    console.dir(err);
                  }
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDatasetInfo() {
        return _ref.apply(this, arguments);
      }

      return getDatasetInfo;
    }()
  }, {
    key: "searchEntries",
    value: function searchEntries() {
      var conditions = this.state.conditions;
      var foundEntries = this.state.entries.slice(0);

      if (conditions.length === 0) {
        this.setState({
          searchedEntries: foundEntries,
          adding: false,
          menu: false
        });
        return;
      }

      for (var i = 0; i < conditions.length; i++) {
        var condition = conditions[i];
        var col = condition.col;
        var type = condition.type;
        var value = condition.value;

        if (type === 'equals') {
          for (var j = 0; j < foundEntries.length; j++) {
            if (foundEntries[j][col] === null) {
              foundEntries.splice(j, 1);
              j--;
            }

            if (foundEntries[j][col] !== value) {
              foundEntries.splice(j, 1);
              j--;
            }
          }
        } else if (type === 'contains') {
          for (var _j = 0; _j < foundEntries.length; _j++) {
            if (foundEntries[_j][col] === null) {
              foundEntries.splice(_j, 1);
              _j--;
            }

            if (!foundEntries[_j][col].includes(value)) {
              foundEntries.splice(_j, 1);
              _j--;
            }
          }
        }
      }

      this.setState({
        adding: false,
        menu: false,
        searchedEntries: foundEntries
      });
    }
  }, {
    key: "stopPropagation",
    value: function stopPropagation(e) {
      e.stopPropagation();
    }
  }, {
    key: "removeCondition",
    value: function removeCondition(index) {
      var newConditions = this.state.conditions;
      newConditions.splice(index, 1);
      this.setState({
        conditions: newConditions
      });
    }
  }, {
    key: "render",
    value: function render() {
      var unviewDataset = this.props.unviewDataset;
      var csrf = this.props.csrf;

      var datasetName = this.state.datasetName;
      var columns = this.state.columns;
      var adding = this.state.adding;
      var conditions = this.state.conditions;
      var searchedEntries = this.state.searchedEntries;
      var entries = this.state.entries;
      var loading = this.state.loading;

      var menu = this.state.menu;

      return React.createElement(
        "div",
        { id: "datasetViewContainer" },
        loading ? React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            null,
            "Loading..."
          )
        ) : React.createElement(
          "div",
          null,
          menu ? React.createElement(
            "div",
            { id: "menuContainer", onClick: this.toggleMenu },
            React.createElement(
              "div",
              { id: "menu", onClick: this.stopPropagation },
              React.createElement(
                "h2",
                { id: "datasetSearchTitle" },
                "Dataset Search"
              ),
              React.createElement(AddCondition, { columns: columns, submitCondition: this.addCondition }),
              React.createElement(
                "h3",
                { id: "datasetConditionsTitle" },
                "Conditions"
              ),
              React.createElement(ConditionList, { conditions: conditions, removeCondition: this.removeCondition }),
              React.createElement(
                "button",
                { id: "searchEntriesButton", onClick: this.searchEntries },
                "Search Entries"
              )
            )
          ) : React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { id: "datasetViewHeader" },
              React.createElement(
                "h2",
                { id: "datasetViewName" },
                datasetName
              ),
              React.createElement(
                "button",
                { id: "datasetViewButton", onClick: unviewDataset },
                "Return to Dataset List"
              ),
              React.createElement(
                "button",
                { id: "datasetViewButton", onClick: this.toggleMenu },
                "Search Dataset"
              )
            ),
            React.createElement(
              "div",
              { className: "datasetViewListItem datasetViewHeadingRow" },
              React.createElement(
                "div",
                { className: "datasetNumBox" },
                "#"
              ),
              columns.map(function (column) {
                return React.createElement(
                  "div",
                  { className: "datasetItemBox datasetColumnBox" },
                  column
                );
              })
            ),
            searchedEntries.map(function (entry, index) {
              return React.createElement(
                "div",
                { className: "datasetViewListItem" },
                React.createElement(
                  "div",
                  { className: "entryIndexBox" },
                  index
                ),
                columns.map(function (column) {
                  return React.createElement(
                    "div",
                    { className: "datasetItemBox" },
                    entry[column]
                  );
                })
              );
            })
          )
        )
      );
    }
  }]);

  return SearchedDataset;
}(React.Component);

var ViewedDataset = function (_React$Component7) {
  _inherits(ViewedDataset, _React$Component7);

  function ViewedDataset(props) {
    _classCallCheck(this, ViewedDataset);

    var _this10 = _possibleConstructorReturn(this, (ViewedDataset.__proto__ || Object.getPrototypeOf(ViewedDataset)).call(this, props));

    _this10.state = {
      datasetID: '',
      datasetName: '',
      columns: [],
      entries: [],
      loading: true,
      currentEntry: {}
    };

    _this10.getDatasetInfo = _this10.getDatasetInfo.bind(_this10);
    _this10.editDataset = _this10.editDataset.bind(_this10);
    _this10.removeEntry = _this10.removeEntry.bind(_this10);
    _this10.updateCurrentEntry = _this10.updateCurrentEntry.bind(_this10);
    _this10.submitCurrentEntry = _this10.submitCurrentEntry.bind(_this10);
    return _this10;
  }

  _createClass(ViewedDataset, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getDatasetInfo();
    }
  }, {
    key: "editDataset",
    value: function editDataset(csrf) {
      var _this11 = this;

      $.ajax({
        type: "POST",
        url: '/editDataset',
        data: {
          _csrf: csrf,
          entries: this.state.entries,
          datasetID: this.state.datasetID
        },
        success: function success() {
          _this11.getDatasetInfo();
        }
      }).error(function (err) {});
    }
  }, {
    key: "removeEntry",
    value: function removeEntry(index) {
      var newEntries = this.state.entries;
      newEntries.splice(index, 1);
      this.setState({
        entries: newEntries
      });
    }
  }, {
    key: "updateCurrentEntry",
    value: function updateCurrentEntry(e, column) {
      var currentEntry = this.state.currentEntry;
      if (e.target.value === '') delete currentEntry[column];else currentEntry[column] = e.target.value;
      this.setState({
        currentEntry: currentEntry
      });
    }
  }, {
    key: "submitCurrentEntry",
    value: function submitCurrentEntry(csrf) {
      var _this12 = this;

      // If all entries are empty, ignore the submission
      if (Object.keys(this.state.currentEntry).length === 0) {
        return;
      }

      var currentEntries = this.state.entries;
      currentEntries.unshift(this.state.currentEntry);
      this.setState({
        entries: currentEntries
      });

      $.ajax({
        type: "POST",
        url: '/editDataset',
        data: {
          _csrf: csrf,
          entries: this.state.entries,
          datasetID: this.state.datasetID
        },
        success: function success() {
          _this12.getDatasetInfo();
          var columnInputs = $('.datasetColumnInput');
          for (var i = 0; i < columnInputs.length; i++) {
            var ci = columnInputs[i];
            ci.value = '';
          }
          _this12.setState({
            currentEntry: {}
          });
        }
      }).error(function (err) {});
    }

    // getDatasetInfo:
    // - Request dataset from the server
    // //////////////////////////////

  }, {
    key: "getDatasetInfo",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this13 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return $.ajax({
                  type: "GET",
                  url: '/getDataset',
                  data: {
                    datasetID: this.props.datasetID
                  },
                  success: function success(response) {
                    response = JSON.parse(response);
                    var dataset = response.dataset;
                    _this13.setState({
                      datasetID: dataset._id,
                      datasetName: dataset.datasetName,
                      columns: dataset.columns,
                      entries: dataset.entries,
                      loading: false
                    });
                  },
                  error: function error(err) {
                    console.dir(err);
                  }
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDatasetInfo() {
        return _ref2.apply(this, arguments);
      }

      return getDatasetInfo;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this14 = this;

      var unviewDataset = this.props.unviewDataset;
      var csrf = this.props.csrf;

      var datasetName = this.state.datasetName;
      var columns = this.state.columns;
      var entries = this.state.entries;
      var loading = this.state.loading;

      return React.createElement(
        "div",
        { id: "datasetViewContainer" },
        loading ? React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            null,
            "Loading..."
          )
        ) : React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { id: "datasetViewHeader" },
            React.createElement(
              "h2",
              { id: "datasetViewName" },
              datasetName
            ),
            React.createElement(
              "button",
              { id: "datasetViewButton", onClick: unviewDataset },
              "Return to Dataset List"
            ),
            React.createElement(
              "button",
              { id: "datasetViewButton", onClick: function onClick() {
                  return _this14.editDataset(csrf);
                } },
              "Save Changes"
            ),
            React.createElement(
              "button",
              { id: "datasetViewButton", onClick: this.getDatasetInfo },
              "Refresh Dataset"
            )
          ),
          React.createElement(
            "div",
            { className: "datasetViewListItem datasetViewHeadingRow" },
            React.createElement(
              "div",
              { className: "datasetNumBox" },
              "#"
            ),
            columns.map(function (column) {
              return React.createElement(
                "div",
                { className: "datasetItemBox datasetColumnBox" },
                column
              );
            })
          ),
          React.createElement(
            "div",
            { className: "datasetViewListItem" },
            React.createElement(
              "div",
              { className: "submitEntryBox", onClick: function onClick() {
                  return _this14.submitCurrentEntry(csrf);
                } },
              "+"
            ),
            columns.map(function (column) {
              return React.createElement(
                "div",
                { className: "datasetItemBox datasetColumnBox" },
                React.createElement("input", { className: "datasetColumnInput", type: "text", placeholder: column, onChange: function onChange(e) {
                    return _this14.updateCurrentEntry(e, column);
                  } })
              );
            })
          ),
          entries.map(function (entry, index) {
            return React.createElement(
              "div",
              { className: "datasetViewListItem" },
              React.createElement(
                "div",
                { className: "removeDatasetItemBox", onClick: function onClick() {
                    return _this14.removeEntry(index);
                  } },
                index
              ),
              columns.map(function (column) {
                return React.createElement(
                  "div",
                  { className: "datasetItemBox" },
                  entry[column]
                );
              })
            );
          })
        )
      );
    }
  }]);

  return ViewedDataset;
}(React.Component);

var DatasetList = function (_React$Component8) {
  _inherits(DatasetList, _React$Component8);

  function DatasetList(props) {
    _classCallCheck(this, DatasetList);

    var _this15 = _possibleConstructorReturn(this, (DatasetList.__proto__ || Object.getPrototypeOf(DatasetList)).call(this, props));

    _this15.state = {
      selectedID: '',
      searching: false
    };

    _this15.componentDidUpdate = _this15.componentDidUpdate.bind(_this15);
    _this15.searchDataset = _this15.searchDataset.bind(_this15);
    _this15.viewDataset = _this15.viewDataset.bind(_this15);
    _this15.unviewDataset = _this15.unviewDataset.bind(_this15);
    return _this15;
  }

  // componentDidMount:
  // - Apply styles to the img svg's that can only be done in code after the elements are rendered
  // //////////////////////////////


  _createClass(DatasetList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // Borrowed from https://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
      $('img.vlIcon').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
          if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
          }

          // Replace image with new SVG
          $img.replaceWith($svg);
        }, 'xml');
      });
    }
  }, {
    key: "viewDataset",
    value: function viewDataset(id) {
      this.setState({
        searching: false,
        selectedID: id
      });
    }
  }, {
    key: "searchDataset",
    value: function searchDataset(id) {
      this.setState({
        searching: true,
        selectedID: id
      });
    }
  }, {
    key: "unviewDataset",
    value: function unviewDataset() {
      this.setState({
        searching: false,
        selectedID: ''
      });
    }

    // downloadDataset:
    // - Retrieve CSV string from server and download the dataset as a CSV
    // //////////////////////////////

  }, {
    key: "downloadDataset",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, datasetName) {
        var result, element;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return $.ajax({
                  type: "GET",
                  url: '/getDatasetCSV',
                  data: {
                    datasetID: id
                  }
                });

              case 2:
                result = _context3.sent;


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
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function downloadDataset(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return downloadDataset;
    }()

    // removeDataset:
    // - Attempt to remove dataset from the database
    // //////////////////////////////

  }, {
    key: "removeDataset",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        var _this16 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return $.ajax({
                  type: 'DELETE',
                  url: '/removeDataset',
                  data: {
                    datasetID: id,
                    _csrf: this.props.csrf
                  },
                  success: function success() {
                    _this16.props.getUserDatasets();
                  }
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeDataset(_x3) {
        return _ref4.apply(this, arguments);
      }

      return removeDataset;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var userDatasets = this.props.userDatasets;
      var csrf = this.props.csrf;

      var viewing = this.state.selectedID !== '';
      var searching = this.state.searching;

      return React.createElement(
        "div",
        { id: "datasetListContainer" },
        viewing ? React.createElement(
          "div",
          null,
          searching ? React.createElement(SearchedDataset, { datasetID: this.state.selectedID, unviewDataset: this.unviewDataset, csrf: csrf }) : React.createElement(ViewedDataset, { datasetID: this.state.selectedID, unviewDataset: this.unviewDataset, csrf: csrf })
        ) : React.createElement(
          "div",
          { id: "datasetListView" },
          userDatasets.length < 1 && React.createElement(
            "div",
            { id: "noDatasetsContainer" },
            React.createElement(
              "h2",
              { id: "noDatasetsMessage" },
              "No datasets yet. Start uploading some data!"
            )
          ),
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
                { className: "datasetListItemSpan datasetListItemLink", onClick: function onClick() {
                    _this17.viewDataset(dataset._id);
                  }, "aria-label": "View Dataset" },
                React.createElement("img", { src: "/assets/img/view_icon.svg", className: "vlIcon" })
              ),
              React.createElement(
                "span",
                { className: "datasetListItemSpan datasetListItemLink", onClick: function onClick() {
                    _this17.downloadDataset(dataset._id, dataset.datasetName);
                  }, "aria-label": "Download Dataset" },
                React.createElement("img", { src: "/assets/img/download_icon.svg", className: "vlIcon" })
              ),
              React.createElement(
                "span",
                { className: "datasetListItemSpan datasetListItemLink", onClick: function onClick() {
                    _this17.removeDataset(dataset._id);
                  }, "aria-label": "Delete Dataset" },
                React.createElement("img", { src: "/assets/img/remove_icon.svg", className: "vlIcon" })
              ),
              React.createElement(
                "span",
                { className: "datasetListItemSpan datasetListItemLink", onClick: function onClick() {
                    _this17.searchDataset(dataset._id);
                  }, "aria-label": "Search Dataset" },
                React.createElement("img", { src: "/assets/img/search_icon.svg", className: "vlIcon" })
              )
            );
          })
        )
      );
    }
  }]);

  return DatasetList;
}(React.Component);

var Analytics = function (_React$Component9) {
  _inherits(Analytics, _React$Component9);

  function Analytics(props) {
    _classCallCheck(this, Analytics);

    var _this18 = _possibleConstructorReturn(this, (Analytics.__proto__ || Object.getPrototypeOf(Analytics)).call(this, props));

    _this18.state = {};
    return _this18;
  }

  _createClass(Analytics, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "analyticsContainer" },
        React.createElement(
          "h2",
          { id: "analyticsSubheading" },
          "No analytics to display"
        ),
        React.createElement(
          "span",
          { id: "analyticsDesc" },
          "Analytics will be coming as a premium feature in future releases of dynalytic."
        )
      );
    }
  }]);

  return Analytics;
}(React.Component);

var Content = function (_React$Component10) {
  _inherits(Content, _React$Component10);

  function Content(props) {
    _classCallCheck(this, Content);

    var _this19 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    _this19.state = {
      selectedPage: "home",
      userDatasets: []
    };

    _this19.selectPage = _this19.selectPage.bind(_this19);
    _this19.getUserDatasets = _this19.getUserDatasets.bind(_this19);
    return _this19;
  }

  _createClass(Content, [{
    key: "selectPage",
    value: function selectPage(pageName) {
      this.setState({ selectedPage: pageName });
      if (pageName === "myData") {
        this.getUserDatasets();
      }
    }

    // getUserDatasets:
    // - Load list of the user's datasets
    // //////////////////////////////

  }, {
    key: "getUserDatasets",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this20 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return $.ajax({
                  type: "GET",
                  url: '/getDatasetList',
                  success: function success(response) {
                    response = JSON.parse(response);
                    _this20.setState({ userDatasets: response.datasets });
                  },
                  error: function error(err) {
                    console.dir(err);
                  }
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getUserDatasets() {
        return _ref5.apply(this, arguments);
      }

      return getUserDatasets;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this21 = this;

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
                  return _this21.selectPage('home');
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
                  return _this21.selectPage('addData');
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
                  return _this21.selectPage('myData');
                }
              },
              React.createElement(
                "span",
                { className: "sidebarSpan" },
                "View Datasets"
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

var Page = function (_React$Component11) {
  _inherits(Page, _React$Component11);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this22 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this22.state = {};

    return _this22;
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {
      var csrf = this.props.csrf;

      return React.createElement(
        "div",
        { id: "page" },
        React.createElement(Header, null),
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

$(document).ready(function () {
  getToken();
});

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