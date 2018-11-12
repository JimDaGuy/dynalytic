// Main app page
// Page for main application
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handleLogoutClick = this.props.handleLogoutClick;

    return (
      <div id="header">
        <a href="/app" className="headerProjectName">dynalytic</a>
        <a href="/logout" className="logoutLink">Logout</a>
      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: "home"
    };

    this.selectPage = this.selectPage.bind(this);
  }

  selectPage(pageName) {
    this.setState({ selectedPage: pageName });
  }

  submitCSV(csrf) {
    const csvFile = $('#csvUpload')[0].files[0];
    const datasetName = $('#datasetName')[0].value;
    
    if (!csvFile) {
      console.dir('No file selected');
      // Throw clientside error 'No file selected'
      return;
    }

    let reader = new FileReader();
    reader.readAsText(csvFile);
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = $.csv.toObjects(csv);
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
          datasetName,
        },
        success: () => {
          $('#csvButton').removeAttr('disabled');
          // Update screen to reflect upload status
        },
      }).error(() => {
        $('#csvButton').removeAttr('disabled');
        // Update screen to reflect upload status
      });
    };
  };

  render() {
    const csrf = this.props.csrf;
    let page;

    switch (this.state.selectedPage) {
      case "home":
        page =
          <div id="homePage" className="selectedDashboardPage" >
            <h1>Hiya!</h1>
          </div>;
        break;
      case "addData":
        page =
          <div id="addDataPage" className="selectedDashboardPage" >
            <h1>Add some data</h1>
            <input id="csvUpload" type="file" accept=".csv" />
            <input id="datasetName" type="text" placeholder="Dataset name" />
            <button id='csvButton' type="button" onClick={() => this.submitCSV(csrf)}>Upload CSV</button>
          </div>;
        break;
      case "myData":
        page =
          <div id="myDataPage" className="selectedDashboardPage" >
            <h1>Here's your data</h1>
          </div>;
        break;
      case "analytics":
        page =
          <div id="analyticsPage" className="selectedDashboardPage" >
            <h1>Analytics here!</h1>
          </div>;
        break;
      default:
        break;
    }

    return (
      <div id="content">
        <div id="dashboard">
          <div id="sidebar">
            <div
              className={`sidebarItem ${this.state.selectedPage === 'home' ? 'selectedSidebarItem' : ''}`}
              onClick={() => this.selectPage('home')}
            >
              <span className="sidebarSpan">Home</span>
            </div>
            <div
              className={`sidebarItem ${this.state.selectedPage === 'addData' ? 'selectedSidebarItem' : ''}`}
              onClick={() => this.selectPage('addData')}
            >
              <span className="sidebarSpan">Add Datasets</span>
            </div>
            <div
              className={`sidebarItem ${this.state.selectedPage === 'myData' ? 'selectedSidebarItem' : ''}`}
              onClick={() => this.selectPage('myData')}
            >
              <span className="sidebarSpan">My Datasets</span>
            </div>
            <div
              className={`sidebarItem ${this.state.selectedPage === 'analytics' ? 'selectedSidebarItem' : ''}`}
              onClick={() => this.selectPage('analytics')}
            >
              <span className="sidebarSpan">Analytics</span>
            </div>
          </div>
          <div id="dashboardPage">
            {page}
          </div>
        </div>
      </div>
    );
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    const csrf = this.props.csrf;

    return (
      <div id="page">
        <Header handleLogoutClick={this.handleLogoutClick} />
        <Content csrf={csrf} />
      </div>
    );
  };
}

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    renderPage(result.csrfToken);
  });
};

const renderPage = (csrf) => {
  ReactDOM.render(
    <Page csrf={csrf} />,
    document.querySelector("#app")
  );
};

const submitCSV = () => {
  console.dir('Pressed it');

  let csvFile = $('#csvFile')[0].files[0];

  if (!csvFile) {
    console.dir('No file selected');
    // Throw clientside error 'No file selected'
    return;
  }

  //Disable submit button while submitting
  $('#csvButton').attr('disabled', 'disabled');

  //Parse CSV 
  const csvJSON = parseCSVToJSON(csvFile);

  //Send JSON to server
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    $('#csvButton').removeAttr('disabled');
    // Update screen to reflect upload status
    console.dir('Ayy lmao');
  };

  xhr.open('POST', '/upload');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(csvJSON));
};

$(document).ready(() => {
  getToken();
});
