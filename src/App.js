import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./Components/Header";
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from "@material-ui/core";

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
    }
  }));
  const classes = useStyles()
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/'Component={Homepage} exact />
          <Route path='/coins/:id'Component={CoinPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
