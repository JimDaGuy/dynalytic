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

  render() {
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

    return (
      <div id="page">
        <Header handleLogoutClick={this.handleLogoutClick} />
        <Content />
      </div>
    );
  };
}

const renderPage = (csrf) => {
  ReactDOM.render(
    <Page />,
    document.querySelector("#app")
  );
};

$(document).ready(() => {
  renderPage();
});
