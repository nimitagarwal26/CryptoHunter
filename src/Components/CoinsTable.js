import React from 'react'
import axios from "axios";
import { Typography, Container,TextField,TableCell,
         TableContainer,LinearProgress, Table, TableHead,
         TableRow, TableBody,Pagination} from '@mui/material'
import { ThemeProvider, createTheme,styled} from "@mui/material/styles";
import {useState,useEffect} from 'react'
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const history=useNavigate();
  const [page, setPage] = useState(1);
  
  const {currency,symbol}=CryptoState();

  const fetchCoins = async () => {
    try{
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
    }catch (error) {
        console.error("Axios Error:", error);
    }
  };

  const AppRoot = styled('div')(({ theme }) => ({
    "& .MuiPaginationItem-root": {
      color: "#4BD1FB",
    },
  }));

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode:"dark"
      },
     
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return <ThemeProvider theme={darkTheme}>
     <Container style={{textAlign:'center'}}>

     <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: "Montserrat" }}
        >
        Cryptocurrency Prices by Market Cap
     </Typography>
     
     <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%"}}
          onChange={(e) => setSearch(e.target.value)}
     />

     <TableContainer>
      {
        loading ? (
          <LinearProgress style={{ backgroundColor: "#4BD1FB" }} />
        ):(<Table>
          <TableHead>
            <TableRow  style={{ backgroundColor: "#4BD1FB", }}>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row)=>{
                const profit=row.price_change_percentage_24h>0;

                return(
                <TableRow  
                  onClick={() => history.push(`/coins/${row.id}`)}
                  styles={{ backgroundColor: "#16171a",
                         cursor: "pointer",
                         "&:hover": {
                          backgroundColor: "#131111",
                          },
                         fontFamily: "Montserrat",
                       }}
                  key={row.name}
                >
                <TableCell
                  component={TableHead}
                  scope='row'
                  styles={{
                    display: "flex",
                    gap: 15,
                  }}>
                  <img
                    src={row?.image}
                    alt={row.name}
                    height="50"
                    style={{ marginBottom: 10 }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontSize: 22,
                      }}
                    >
                      {row.symbol}
                    </span>
                    <span style={{ color: "darkgrey" }}>
                      {row.name}
                    </span>
                    </div>
                </TableCell>

                <TableCell align="right">
                  {symbol}{" "}
                  {numberWithCommas(row.current_price.toFixed(2))}
                </TableCell>

                <TableCell
                  align="right"
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"}
                  {row.price_change_percentage_24h.toFixed(2)}%
                </TableCell>

                <TableCell align="right">
                  {symbol}{" "}
                  {numberWithCommas(
                    row.market_cap.toString().slice(0, -6)
                  )}
                  M
                </TableCell>
                </TableRow>
              );
              })}
            </TableBody>
          </Table>
      )}
     </TableContainer>
     <AppRoot>
     <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />

     </AppRoot>
     
    </Container>
  </ThemeProvider>;
}

export default CoinsTable