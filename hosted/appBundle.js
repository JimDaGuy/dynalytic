"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

var DomoForm = function DomoForm(props) {
  return React.createElement(
    "form",
    { id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
    React.createElement(
      "label",
      { htmlFor: "food" },
      "Food: "
    ),
    React.createElement("input", { id: "domoFood", type: "text", name: "food", placeholder: "Domo's Favorite Food" }),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement(
      "label",
      { htmlFor: "age" },
      "Age: "
    ),
    React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos yet"
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    var removeDomoFormId = "removeDomoForm_" + domo._id;

    var handleRemoveDomo = function handleRemoveDomo(e) {
      e.preventDefault();

      $("#domoMessage").animate({ width: 'hide' }, 350);

      console.dir($(removeDomoFormId));

      sendAjax('POST', $("#" + removeDomoFormId).attr("action"), $("#" + removeDomoFormId).serialize(), function () {
        loadDomosFromServer();
      });

      return false;
    };

    return React.createElement(
      "div",
      { key: domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        " Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoFood" },
        " Favorite Food: ",
        domo.food
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        " Age: ",
        domo.age
      ),
      React.createElement(
        "form",
        { id: removeDomoFormId,
          onSubmit: handleRemoveDomo,
          name: removeDomoFormId,
          action: "/removeDomo",
          method: "POST",
          className: "removeDomoForm"
        },
        React.createElement("input", { type: "hidden", name: "id", value: domo._id }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "removeDomoSubmit", type: "submit", value: "Remove Domo" })
      )
    );
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getToken', null, function (result) {
    sendAjax('GET', '/getDomos', null, function (data) {
      ReactDOM.render(React.createElement(DomoList, { domos: data.domos, csrf: result.csrfToken }), document.querySelector("#domos"));
    });
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#app"));

  loadDomosFromServer();
};

var getToken = function getToken(callback) {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
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