const handleError = (message) => {
  //Change client to reflect error message
};

const redirect = (response) => {
  window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type,
    url: action,
    data,
    dataType: "json",
    success,
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    },
  });
};
