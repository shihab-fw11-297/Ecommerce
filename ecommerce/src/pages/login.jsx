import React from 'react'
import { useState } from "react";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const Login = () => {
    const [gender, setGender] = useState("");
  const [date, setDate] = useState("");


  const loginHandler = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
  
        const [login] = useLoginMutation();

        const res = await login({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            gender,
            role: "user",
            dob: date,
            _id: user.uid,
          });

        console.log(user);

        if ("data" in res) {
            toast.success(res.data.message);
        } else {
            const error = res.error;
            const message = (error.data).message;
            toast.error(message);
        }

    } catch (error) {
        toast.error("Sign In Fail");
      }
  }
  
    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>

                <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label>Date of birth</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div>
                    <p>Already Signed In Once</p>
                    <button onClick={loginHandler}>
                    <AiOutlineGooglePlus /> <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login