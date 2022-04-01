import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./contacts.css";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    async function currentUser() {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      setCurrentUserName(data?.username);
      setCurrentUserImage(data?.avatarImage);
    }
    currentUser();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const handleClick = () => {
    changeChat(undefined);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="container2">
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3 onClick={handleClick}>Wathsapp</h3>
          </div>
          <div className="contacts">
            {contacts?.map((contact, index) => {
              return (
                <>
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
                  <hr />
                </>

              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
