import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/coins/:id" Component={CoinPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
