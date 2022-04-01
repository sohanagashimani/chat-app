import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import "./welcome.css";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function username() {
      setUserName(
        await JSON.parse(localStorage.getItem("chat-app-user"))?.username
      );
    }
    username();
  }, []);
  return (
    <div className="welcomeContainer">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
