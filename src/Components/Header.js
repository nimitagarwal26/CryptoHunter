import { AppBar, Container,Select, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { styled } from "@mui/material";


const AppRoot = styled('div')(({ theme }) => ({
  flex:1,
  color:"white",
  fontFamily: 'Montserrat, sans-serif',
  fontSize:'22px',
  fontWeight:'800',
  cursor:'pointer',
}));

const Header = () => {
  return (
   <AppBar color='primary' position='static'>
      <Container>
        <Toolbar>

          <AppRoot><Typography><AppRoot>Crypto Hunter</AppRoot></Typography></AppRoot>
          <Select variant='outlined'  style={{width:100,height:40,marginLeft:15 }}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
           </Select>
           
        </Toolbar>
      </Container>
     
   </AppBar>
  );
};

export default Header