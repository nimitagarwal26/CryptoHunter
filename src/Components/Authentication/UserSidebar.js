import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });


  const {user,setAlert}= CryptoState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successful !",
        });

    toggleDrawer();
  };

 
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
                  style={{
                    height: 38,
                    width: 38,
                    cursor: "pointer",
                    backgroundColor: "#4BD1FB"}}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                 />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            
            <div style={{width: 350,
                         padding: 25,
                         height: "100%",
                         display: "flex",
                         flexDirection: "column",
                         fontFamily: "monospace"}}>

                <div style={{ flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "20px",
                              height: "92%"}}>

                    <Avatar style={{ width: 200,
                                     height: 200,
                                     cursor: "pointer",
                                     backgroundColor: "#4BD1FB",
                                     objectFit: "contain"}}
                            src={user.photoURL}
                            alt={user.displayName || user.email}/>

                        <span style={{
                                    width: "100%",
                                    fontSize: 25,
                                    textAlign: "center",
                                    fontWeight: "bolder",
                                    wordWrap: "break-word",}}>
                            {user.displayName || user.email}
                        </span>

                        <div style={{flex: 1,
                                     width: "100%",
                                     backgroundColor: "grey",
                                     borderRadius: 10,
                                     padding: 15,
                                     paddingTop: 10,
                                     display: "flex",
                                     flexDirection: "column",
                                     alignItems: "center",
                                     gap: 12,
                                     overflowY: "scroll"}}>
                           <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                Watchlist
                           </span>

                        </div>
                    <Button variant="contained"
                            style={{ height: "8%",
                                     width: "100%",
                                     backgroundColor: "#4BD1FB",
                                     marginTop: 20,}}
                            onClick={logOut}>
                        Log Out
                    </Button>

                </div>
            </div>

          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}