import React from 'react'
import classes from './Button.module.css'

const button = (props) => {
    console.log(props.valid)
    return(
        <button className={classes.Button} onClick={props.click} disabled={!props.valid}>{props.children}</button>
    )
}
export default button