import GradientBar from "./components/atoms/bar/gradient-bar";
import Router from "./shared/router";

function App() {
  // if (process.env.REACT_APP_SCRIPT === "production") {
  //   console.log = function no_console() {};
  //   console.warn = function no_console() {};
  // }

  return (
    <div className="App">
      <GradientBar />
      <div className="contents_area">
        <Router />
      </div>
    </div>
  );
}

export default App;
