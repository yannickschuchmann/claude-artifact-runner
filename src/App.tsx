import "./App.css";
import { Route, Switch } from "wouter";
import Artifact from "./_example-artifact-component";
import CocoCoirCalculator from "./coco-coir-calculator";
import ChangaCalculator from "./changa-calculator";

function App() {
  return (
    <Switch>
      <Route path="/" component={Artifact} />
      <Route path="/coco-coir-calculator" component={CocoCoirCalculator} />
      <Route path="/changa-calculator" component={ChangaCalculator} />
    </Switch>
  );
}

export default App;
