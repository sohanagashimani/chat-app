import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import "./setAvtar.css";

const SetAvtar = () => {
  const api = `https://api.multiavatar.com/465846`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) navigate("/login");
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avtar.", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      console.log(data.isSet);
      if (data?.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar.", toastOptions);
      }
    }
  };
  useEffect(() => {
    async function fetchImage() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchImage();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="setAvtarContainer">
        {isLoading ? (
          <img src={loader} alt="loader" className="loader" />
        ) : (
          <>
            {" "}
            <div className="title">
              <h1>Pick an avtar as your profile</h1>
            </div>
            <div className="avtars">
              {avatars.map((avtar, index) => {
                return (
                  <div
                    key={index}
                    className={`avtar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avtar}`}
                      alt="avtar"
                      onClick={() => {
                        setSelectedAvatar(index);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <button onClick={setProfilePicture} className="submit-btn">
              Set as Profile Picture
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SetAvtar;
