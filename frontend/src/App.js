import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage.component";
import ChatPage from "./Pages/ChatPage.component";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chat" component={ChatPage} />
    </div>
  );
}

export default App;
