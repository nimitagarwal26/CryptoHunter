import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { styled } from "@mui/material";//used styled instead of makeStyles because new version does not support it.
import Alert from "./Components/Alert";

const AppRoot = styled('div')(({ theme }) => ({
  backgroundColor: "#14161a",
  color: 'white',
  minHeight: '100vh',
}));

function App() {
  return (
    <BrowserRouter>
      <AppRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </AppRoot>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
