import {Link, Outlet} from "react-router-dom";
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navigation-container">
          <Link to="/">BeerBuddy</Link>
          <Link to="/">Browse Beers</Link>
          <Link to="/favorite">Favorite Beers</Link>
        </nav>
      </header>
      <Outlet/>
    </div>
  );
}

export default App;
