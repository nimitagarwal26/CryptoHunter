import { AppBar, Container,Select, MenuItem, Toolbar, Typography, withTheme} from '@mui/material'
import React from 'react'
import { styled } from "@mui/material";
import {  useNavigate } from 'react-router-dom';//in new version we use navigate instead of useHistory.
import { fontSize } from '@mui/system';
import { CryptoState } from '../CryptoContext';


const AppRoot = styled('div')(({ theme }) => ({
  flex:1,
  color:"white",
  fontFamily: 'Montserrat, sans-serif',
  fontSize:'22px',
  fontWeight:'800',
  cursor:'pointer',
}));

const Header = () => {
  const history= useNavigate();
  
  const {currency,setCurrency}=CryptoState();
  console.log(currency);
  
return (
   
    <AppBar color='primary' position='static'>
      <Container>
        <Toolbar>

          <AppRoot onClick={()=>history("/")}><Typography><AppRoot>Crypto Hunter</AppRoot></Typography></AppRoot>
          <Select variant='outlined'  
            style={{width:100,height:40,marginLeft:15 }}
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
           </Select>
           
        </Toolbar>
      </Container>
     
   </AppBar>
   
  
  );
};

export default Header