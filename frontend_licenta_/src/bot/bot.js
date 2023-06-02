import React from "react";
import Navbar from "../navbar/navbar";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

const API_KEY = "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"

export const Bot = () => {
    const [typing, setTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            message:"Hello! I am your assistant today. I am here to answer your questions related to animals or adopting one. How can I help you?",
            sender:"Assistant"
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage]; //all the old messages + the new ones

        //update our message state
        setMessages(newMessages);

        //set a typing indicator(ChatGPT is typing...)
        setTyping(true);
        //process message with ChatGPT (send it over and see response)
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMesssages){
        let apiMessages = chatMesssages.map((messageObject) => {
            let role ="";
            if(messageObject.sender === "Assistant") {
                role="assistant"
            } else {
                role = "user"
            }
            return {role: role, content: messageObject.message}
        });

        const systemMessage = {
            role: "system",
            content: "Give me answers for questions that are only related to animals or adopting them."
        }
        const apiRequestBody = {
            "model" : "gpt-3.5-turbo",
            "messages": [systemMessage, ...apiMessages]
        }
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            console.log(data.choices[0].message.content)
            setMessages([...chatMesssages, {
                message: data.choices[0].message.content,
                sender: "Assistant"
            }]);
            setTyping(false);
        })
    }
    return(
        <>
        <Navbar/>
        <div style={{ position:"relative", height:"100%-78px"}}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        typingIndicator={typing ? <TypingIndicator content="Assistant is typing..." />:null}
                    >
                        {messages.map((message, i)=>{
                            return <Message key={i} model={message}/>
                        })}
                    </MessageList>
                    <MessageInput placeholder='Type message here...' onSend={handleSend}/>
                </ChatContainer>
            </MainContainer>
        </div>
        </>
    )
}
