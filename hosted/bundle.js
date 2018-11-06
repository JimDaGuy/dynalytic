"use strict";

// Landing page for default users
// Displays information about the application and sign in / sign up links
var Header = function Header(props) {
  return React.createElement(
    "div",
    { id: "header" },
    "Header"
  );
};

var Body = function Body(props) {
  return React.createElement(
    "div",
    { id: "body" },
    "Body"
  );
};

var Page = function Page(props) {
  return React.createElement(
    "div",
    { id: "page" },
    React.createElement(Header, null),
    React.createElement(Body, null)
  );
};

var renderPage = function renderPage() {
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