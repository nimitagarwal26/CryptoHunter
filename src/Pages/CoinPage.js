// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { CryptoState } from '../CryptoContext';
// import axios from 'axios';
// import { SingleCoin } from "../config/api";
// import CoinInfo from '../Components/CoinInfo';

// export const CoinPage = () => {
//   const {id} = useParams();
//   const [coin,setCoin] = useState();

//   const {currency,symbol} = CryptoState();

//   const fetchCoin = async () =>{
//     const {data}=await axios.get(SingleCoin(id));

//     setCoin(data);
//   };
//   console.log(coin);

//   useEffect(()=>{
//     fetchCoin();
//   },[]);

//   const AppRoot = styled('div')(({ theme }) => ({}));

//   return (
//     <div className={classes.container}>
//       <div className={classes.sidebar}>
//         {/*sidebar*/}
//       </div>
//       {/*chart*/}
//       <CoinInfo coin={coin} />
//     </div>
//   )
// }
// export default CoinPage



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { CryptoState } from '../CryptoContext';
// import axios from 'axios';
// import { SingleCoin } from '../config/api';
// import CoinInfo from '../Components/CoinInfo';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Typography } from '@mui/material';

// const CoinPage = () => {
//   const { id } = useParams();
//   const [coin, setCoin] = useState();

//   const { currency, symbol } = CryptoState();
  
//   // Create a theme using createTheme
//   const theme = createTheme();

//   const fetchCoin = async () => {
//     try {
//       const { data } = await axios.get(SingleCoin(id));
//       setCoin(data);
//     } catch (error) {
//       console.error("Axios Error:", error);
//     }
//   };

//   console.log(coin);

//   useEffect(() => {
//     fetchCoin();
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}>
//         <div style={{
//           width: "30%",
//           [theme.breakpoints.down("md")]: {
//             width: "100%",
//           },
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginTop: 25,
//           borderRight: "2px solid grey",
//         }}>
//           <img
//             src={coin?.image.large}
//             alt={coin?.name}
//             height="200"
//             style={{ marginBottom: 20 }}
//           />
//           <Typography variant="h3" className={classes.heading}>
//             {coin?.name}
//           </Typography>
//         </div>
//         {/* Chart content */}
//         <CoinInfo coin={coin} />
//       </div>
//     </ThemeProvider>
//   );
// };

// export default CoinPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

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

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        }}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" style={{  
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",/*inline styles for heading */ }}>
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
        </div>
        {/* Chart content */}
        <CoinInfo coin={coin} />
      </div>
    </ThemeProvider>
  );
};

export default CoinPage;
