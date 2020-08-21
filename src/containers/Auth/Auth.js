import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class SignupForm extends Component{    
    state = {
        formInfo: {
            email: {
                elementType: 'input',
                config:{
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: null
            },
            password: {
                elementType: 'input',
                config:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: null
            },
            confirm_password: {
                elementType: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: null
            }
        },
        isSignup: true 
    }
    checkvalidityHandler = (type=null,rules,value) => {
        let valid = true;
        if(rules.required)
        {
            valid &=(value.length>0)
        }
        if(type==='email')
        {
            valid &= email_regex.test(value)
        }
        if(type==='confirm_password')
        {
            const pass = this.state.formInfo.password.value;
            valid&=(pass===value)
        }
        return Boolean(valid);
    }
    changeAuthmethodHandler = () => {
        this.setState(prevState=>{
            return {
                isSignup: !prevState.isSignup
            }
        })
    }
    changeInputValueHandler = (event,id) => {
        let updatedForm = {
            ...this.state.formInfo
        }
        let updatedTuple = {
            ...this.state.formInfo[id]
        }
        updatedTuple.value = event.target.value
        updatedTuple.valid = this.checkvalidityHandler(id,updatedTuple.validation,updatedTuple.value)
        console.log(updatedTuple.valid)
        updatedForm[id] = updatedTuple
        this.setState({
            formInfo: updatedForm
        })
    }
    render(){
        let form = null
        let formFields = []
        let validity = false;
        let check = true;
        for(let i in this.state.formInfo)
        {
            if(!this.state.isSignup&&i==='confirm_password')
                continue;
            check &= this.state.formInfo[i].valid
            let currField = {
                config: this.state.formInfo[i],
                id: i
            }
            formFields.push(currField)           
        }
        validity |= check;
        form = formFields.map(field=>{
           return <Input 
           type={field.config.elementType} 
           value={field.config.value} 
           config={field.config.config}
           valid = {field.config.valid} 
           change={(event)=>{this.changeInputValueHandler(event,field.id)}} key={field.id}/> 
        }) 
        return(
            <div className={classes.Container}>
                <div className={classes.Selectors}>
                    <Button valid>Coach</Button>
                    <Button valid>Player</Button>
                </div>
                <div className={classes.Form}>
                    <label>{this.state.isSignup ? "Signup" : "Login"}</label>
                    {form}
                    <Button valid={validity}>{this.state.isSignup ? "Signup" : "Login"}</Button>                    
                    <p>{this.state.isSignup ? "Already Registered?" : "New User?"}</p>
                    <Button valid click={this.changeAuthmethodHandler}>{this.state.isSignup ? "Login" : "Signup"}</Button>
                </div>
            </div>
        )       
    }   
}
export default SignupForm