import React from 'react'
import classes from './Input.module.css'
const input = (props) => {
    let element = null;
    let styles = [classes.Input]
    console.log(props.valid)
    if(props.valid!==null)
    {
        styles.push(props.valid ? classes.valid : classes.invalid)
    }
    switch(props.type){
        case 'input':
            element = <input className={styles.join(' ')} onChange={props.change} type={props.config.type} placeholder={props.config.placeholder} value={props.value} />
            break
        default:
            element = null;
    }
    return(
        element
    )
}
export default input