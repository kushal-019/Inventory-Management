import "./App.css";
import Dashboard  from "./components/Dashboard";
import {  BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import Home from "./components/Home";
const App = () => {
 

  return(
    <Router>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/>
  </Routes>
 </Router>
 
  

   )
};

export default App;