// Landing page for default users
// Displays information about the application and sign in / sign up links
const Header = (props) => {
  return (
    <div id="header">
      Header
    </div>
  )
};

const Body = (props) => {
  return (
    <div id="body">
      Body
    </div>
  )
};

const Page = (props) => {
  return (
    <div id="page">
      <Header/>
      <Body/>
    </div>
  )
};

const renderPage = () => {
  ReactDOM.render(
    <Page/>,
    document.querySelector("#app")
  );
};

$(document).ready(() => {
  renderPage();
});
