import { ClassNames } from '@emotion/react'
import React from 'react'

const SelectButton = ({children, selected, onClick}) => {
  return (
    
    <span onClick={onClick}
    style={{
        border: "1px solid #4BD1FB",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "#4BD1FB" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        //   margin: 5,
      }
    }
    >
        {children}
    </span>
  )
}

export default SelectButton