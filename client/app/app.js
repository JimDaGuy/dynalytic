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

class WelcomeHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="welcomeContainer">

      </div>
    );
  }
}

class AddDataset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
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

    return (
      <div id="addDataContainer">
        <span id="addDataSubheading">Upload a CSV file, enter a dataset name, and click create!</span>
        <label id="datasetNameLabel">Dataset Name:</label>
        <input id="datasetName" type="text" placeholder="Dataset name" />
        <label id="csvUploadContainer">
          <img id="csvUploadIcon" src="/assets/img/upload_icon.png" />
          <span id="csvUploadSpan">Upload</span>
          <input id="csvUpload" type="file" accept=".csv" />
        </label>
        <button id='csvButton' type="button" onClick={() => this.submitCSV(csrf)}>Create Dataset</button>
      </div>
    );
  }
}

class DatasetList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  async downloadDataset(id, datasetName) {
    const result = await $.ajax({
      type: "GET",
      url: '/getDatasetCSV',
      data: {
        datasetID: id,
      }
    });

    // Borrowed from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(result));
    element.setAttribute('download', `${datasetName}.csv`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  async removeDataset(id) {
    const result = await $.ajax({
      type: 'DELETE',
      url: '/removeDataset',
      data: {
        datasetID: id,
        _csrf: this.props.csrf,
      },
      success: () => {
        this.props.getUserDatasets();
      },
    });

    console.dir(result);
  }

  render() {
    const userDatasets = this.props.userDatasets;

    return (
      <div id="datasetListContainer">
        {userDatasets.map((dataset) => {
          return <div className="datasetListItem">
            <span className="datasetListItemSpan datasetListItemName">{dataset.datasetName}</span>
            <span className="datasetListItemSpan datasetListItemDate">Last edited: {new Date(dataset.lastEdited).toDateString()}</span>
            <span className="datasetListItemSpan datasetListItemLink">View</span>
            <span className="datasetListItemSpan datasetListItemLink" onClick={() => { this.downloadDataset(dataset._id, dataset.datasetName) }}>Download</span>
            <span className="datasetListItemSpan datasetListItemLink" onClick={() => { this.removeDataset(dataset._id) }}>Delete</span>
          </div>;
        })}
      </div>
    )
  }
}

class Analytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="analyticsContainer">

      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: "home",
      userDatasets: [],
    };

    this.selectPage = this.selectPage.bind(this);
    this.getUserDatasets = this.getUserDatasets.bind(this);
  }

  selectPage(pageName) {
    this.setState({ selectedPage: pageName });
    if (pageName === "myData") {
      this.getUserDatasets();
    }
  }

  async getUserDatasets() {
    await $.ajax({
      type: "GET",
      url: '/getDatasetList',
      success: (response) => {
        response = JSON.parse(response);
        this.setState({ userDatasets: response.datasets });
      },
      error: (err) => {
        console.dir(err);
      }
    });
  }

  render() {
    const csrf = this.props.csrf;
    let page;

    switch (this.state.selectedPage) {
      case "home":
        page =
          <div id="homePage" className="selectedDashboardPage" >
            <h1>Welcome!</h1>
            <WelcomeHome />
          </div>;
        break;
      case "addData":
        page =
          <div id="addDataPage" className="selectedDashboardPage" >
            <h1>Create a dataset</h1>
            <AddDataset csrf={csrf} />
          </div>;
        break;
      case "myData":
        page =
          <div id="myDataPage" className="selectedDashboardPage" >
            <h1>Here's your data</h1>
            <DatasetList csrf={csrf} getUserDatasets={this.getUserDatasets} userDatasets={this.state.userDatasets} />
          </div>;
        break;
      case "analytics":
        page =
          <div id="analyticsPage" className="selectedDashboardPage" >
            <h1>Analytics here!</h1>
            <Analytics />
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
              <span className="sidebarSpan">Create Datasets</span>
            </div>
            <div
              className={`sidebarItem ${this.state.selectedPage === 'myData' ? 'selectedSidebarItem' : ''}`}
              onClick={() => this.selectPage('myData')}
            >
              <span className="sidebarSpan">View Datasets</span>
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
        <div id="footer"></div>
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
