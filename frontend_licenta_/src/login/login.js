import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { saveToken } from "../utils/storage";
import { getToken } from "../utils/storage";
import { _post } from "../utils/api";
import jwt from "jwt-decode";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState([]);
    const history = useNavigate();
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log(email);
        console.log(pass);
         _post("http://localhost:3001/auth/login", {
             email:email,
             password:pass
         }).then((response) => {
             if (response) {
                 saveToken(response.data.access_token);
                 console.log("token: ", response.data.access_token);
                 
             } else {
                 setError("Email and/or password is not valid!");
             }
         }).catch((err) => {
             console.log(err);
         }) 
    }
/*
    useEffect(() => {
         if (getToken()) {
             setToken(jwt(getToken()))
         }
         else {
             setToken("");
         };
    }, []);*/
            return (
        <>
            <div className={styles.Appauth}>
                
                <div className={styles.divlogin}>   
                
                    <div className={styles.authformcontainerlogin}>
                        <form className={styles.loginform} onSubmit={handleSubmit}>
                

                            { error && <div className={styles.error}>{error}</div> }
                            <label htmlFor="email">Email:</label>
                            <input className={styles.inputlogin} value = {email} onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                    handleSubmit(e);
                                    }
                                }} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                            <label htmlFor="password">Password:</label>
                            <input className={styles.inputlogin} value = {pass} onChange={(e) => setPass(e.target.value)} 
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                    handleSubmit(e);
                                    }
                                }} type="password" placeholder="********" id="password" name="password" />
                            
                            <button id="recover-button" className={styles.linkbtnrecover} onClick={() => history("/signup/signup")}>Forgot password?</button>

                            <button id="login-button" className={styles.loginbtn} type="submit"><b>Login</b></button>
                        </form>

                    </div>
                </div>
            </div>

            </>
        );
    

}