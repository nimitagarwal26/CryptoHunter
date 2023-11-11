import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const AppRoot = styled('div')(({ theme }) => ({
  height: '50%',
  display: 'flex',
  alignItems: 'center',
}));

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    // Move the let profit outside of the JSX expression
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link key={coin.id} to={`/coins/${coin.id}`} style={{ textDecoration: 'none', marginRight: 10, color: 'inherit' }}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span style={{
          display: "flex",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}>
          {coin?.symbol}
          &nbsp;
          <span style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            textTransform: "uppercase",
            color: profit > 0? "rgb(14,203,129)" : "red",
            fontWeight: 500,
          }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <p><br></br></p>
        <span style={{fontSize: 18, fontWeight: 490, color: "#4BD1FB" }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <AppRoot>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </AppRoot>
  );
};

export default Carousel;
