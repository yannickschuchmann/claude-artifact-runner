import "./App.css";
import { Route, Switch } from "wouter";
import Start from "./Start";
import CocoCoirCalculator from "./coco-coir-calculator";
import ChangaCalculator from "./changa-calculator";
import FECOBottlingCalculator from "./feco-bottling-calculator";
import StametsCalculator from "./stamets-stack-calculator";

function App() {
  return (
    <Switch>
      <Route path="/" component={Start} />
      <Route path="/coco-coir-calculator" component={CocoCoirCalculator} />
      <Route path="/changa-calculator" component={ChangaCalculator} />
      <Route
        path="/feco-bottling-calculator"
        component={FECOBottlingCalculator}
      />
      <Route path="/stamets-stack-calculator" component={StametsCalculator} />
    </Switch>
  );
}

export default App;
