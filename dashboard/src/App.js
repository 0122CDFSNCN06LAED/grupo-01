import "./assets/css/app.css";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div id="wrapper">
      <Sidebar style={{ background: "#0C3A2D" }} />
      <ContentWrapper />
    </div>
  );
}

export default App;
