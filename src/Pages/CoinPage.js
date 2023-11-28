import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, LinearProgress, Typography } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user,watchlist,setAlert} = CryptoState();

  // Create a theme using createTheme
  const theme = createTheme();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist=async()=>{
    const coinRef = doc(db,"watchlist",user.uid);
    try{
      await setDoc(coinRef,{
        coins: watchlist? [...watchlist,coin?.id]:[coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error){
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });

    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row', // Change to 'row'
          alignItems: 'flex-start', // Align items to the top
        }}
      >
        <div
          style={{
            width: "30%",
            [theme.breakpoints.down("md")]: {
              width: "100%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid grey",
          }}
        >
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" style={{  
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}>
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
          </Typography>
          <div style={{
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
              display: "flex",
              justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
              alignItems: "start",
            },
          }}>
            <span style={{ display: "flex" }}>
              <Typography variant='h5' style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}>
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant='h5' style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}>
                {symbol}{" "}
                {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant='h5' style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}>
                {symbol}{" "}
                {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()].toString().slice(0, -6))}
                M
              </Typography>
            </span>
            {user && (
              <Button
                  variant='outlined'
                  style={{width:"100%",
                          height:40,
                          color:"black",
                          backgroundColor: inWatchlist ? "#ff0000" : "#4BD1FB" ,
                          }}
                  onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}>
                   {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            )}

          </div>
        </div>
        {/* Move CoinInfo component to the right */}
        <CoinInfo coin={coin} />
      </div>
    </ThemeProvider>
  );
};

export default CoinPage;
