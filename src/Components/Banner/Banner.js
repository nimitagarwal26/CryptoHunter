import styled from '@mui/material/styles';
import { Container } from '@mui/material';
import React from 'react'


const AppRoot = styled('div')(({ theme }) => ({
    banner: {
        backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
}));


const Banner = () => {
    const classes = AppRoot(); 
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}></Container>
    </div>
  );
}

export default Banner
