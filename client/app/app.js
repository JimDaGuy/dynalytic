const handleDomo = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), () => {
    loadDomosFromServer();
  });

  return false;
};

const DomoForm = (props) => {
  return (
    <form id="domoForm"
      onSubmit={handleDomo}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
    >
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name" />
      <label htmlFor="food">Food: </label>
      <input id="domoFood" type="text" name="food" placeholder="Domo's Favorite Food" />
      <br></br>
      <br></br>
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
  );
};

const DomoList = (props) => {
  if (props.domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos yet</h3>
      </div>
    );
  }

  const domoNodes = props.domos.map((domo) => {
    const removeDomoFormId = `removeDomoForm_${domo._id}`;

    const handleRemoveDomo = (e) => {
      e.preventDefault();
    
      $("#domoMessage").animate({ width: 'hide' }, 350);
    
      console.dir($(removeDomoFormId));

      sendAjax('POST', $(`#${removeDomoFormId}`).attr("action"), $(`#${removeDomoFormId}`).serialize(), () => {
        loadDomosFromServer();
      });
    
      return false;
    };

    return (
      <div key={domo._id} className="domo">
        <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
        <h3 className="domoName"> Name: {domo.name}</h3>
        <h3 className="domoFood"> Favorite Food: {domo.food}</h3>
        <h3 className="domoAge"> Age: {domo.age}</h3>
        <form id={removeDomoFormId}
          onSubmit={handleRemoveDomo}
          name={removeDomoFormId}
          action="/removeDomo"
          method="POST"
          className="removeDomoForm"
        >
          <input type="hidden" name="id" value={domo._id} />
          <input type="hidden" name="_csrf" value={props.csrf} />
          <input className="removeDomoSubmit" type="submit" value="Remove Domo" />
        </form>
      </div>
    );
  });

  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
};

const loadDomosFromServer = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    sendAjax('GET', '/getDomos', null, (data) => {
      ReactDOM.render(
        <DomoList domos={data.domos} csrf={result.csrfToken} />, document.querySelector("#domos")
      );
    });
  });
};

const setup = (csrf) => {
  ReactDOM.render(
    <DomoForm csrf={csrf} />, document.querySelector("#app")
  );

  loadDomosFromServer();
};

const getToken = (callback) => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(() => {
  getToken();
});
