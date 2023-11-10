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


const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();
  
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
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
          height="90"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
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
