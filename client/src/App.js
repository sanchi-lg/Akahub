import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import './App.css';
import AddOrder from './components/AddEvent';
import Home from './components/Home';
import Login from './components/Login';
import Reports from './components/Events';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
      <header>
        <div style={{ height: "50px", marginBottom: "10px", width: "100%", background: "grey", marginTop: 0, fontWeight: "normal", fontSize: "large", color: "white", verticalAlign: "middle", display: "flex", justifyItems: "center", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
               </div>
      </header>
      <main>
        <BrowserRouter>
          <Switch>
          <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/addevent" exact component={AddOrder} />
            <Route path="/events" exact component={Reports} />

          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
