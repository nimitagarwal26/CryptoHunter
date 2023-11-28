import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { chartDays } from "../config/data"
import SelectButton from './SelectButton';


// ... (import statements)

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);
  const theme = createTheme();
  const chartKey = `${currency}-${days}-${historicData.length}`; // Use a unique key

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setFlag(true);
      setHistoricData(data.prices);
    } catch (error) {
      console.error('Error fetching historic data:', error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 25,
          padding: 40,
          [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        }}
      >
        {!historicData || !flag ? (
          <CircularProgress style={{ color: '#4BD1FB' }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              key={chartKey} // Force remounting when data changes
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: '#4BD1FB',
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value == days}>
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
        {/* buttons */}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;

