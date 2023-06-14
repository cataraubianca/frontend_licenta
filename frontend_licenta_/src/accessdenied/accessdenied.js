import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

export const AccessDenied = () => {

    return(
        <div style={{backgroundColor:"#c2bb9b", height: "100%"}}>
            <Navbar/>
                <h1 style={{marginBottom: "57vh"}}>You do not have access to this page.</h1>
            <Footer/>
        </div>
    )
}