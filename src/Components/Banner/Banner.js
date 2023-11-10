// import styled from '@mui/material/styles';
// import { Container } from '@mui/material';
// import React from 'react'


// const AppRoot = styled('div')(({ theme }) => ({
//     banner: {
//         backgroundImage: "url(./banner2.jpg)",
//     },
//     bannerContent: {
//         height: 400,
//         display: "flex",
//         flexDirection: "column",
//         paddingTop: 25,
//         justifyContent: "space-around",
//     },
// }));


// const Banner = () => {
//     const classes = AppRoot(); 
//   return (
//     <div className={classes.banner}>
//         <Container className={classes.bannerContent}></Container>
//     </div>
//   );
// }

// export default Banner


import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';

const AppRoot = styled('div')(({ theme }) => ({
    backgroundImage: "url(./banner2.jpg)",
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
}));

const Banner = () => {
    return (
        <div>
            <AppRoot>
                <Container>
                    <Typography
                        variant="h2"
                        style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat",
                        //color:"#00F0A8",
                        color:"#4BD1FB",
                        textAlign:"center",
                        }}
                    >
                    Crypto Hunter
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        textAlign:"center",
                        paddingBottom:"30px"
                        }}
                    >
                    Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                    <Carousel />
                </Container>
            </AppRoot>
        </div>
    );
}

export default Banner;
