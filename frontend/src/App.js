import { BrowserRouter as Router, Route} from "react-router-dom";
import { Actions } from "./components/Actions";
import { Nav } from "./components/Nav";
import { Posts } from "./components/Posts";

function App() {
  return (
    <Router>
      <Nav />
        <Route path="/" exact component={Posts} />
        <Route path="/actions/:id?" exact component={Actions} />
    </Router>
  );
}

export default App;
