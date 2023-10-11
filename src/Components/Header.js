import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
   <AppBar color='primary' position='static'>
      <Container>
        <Toolbar>
          <Typography>Crypto Hunter</Typography>
        </Toolbar>
      </Container>
     
   </AppBar>
  );
};

export default Header