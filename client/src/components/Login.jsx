import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UserAuth } from "../context/AuthContext";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";
import { UsersRef } from "../firebase/firebase";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [Loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  // const { currentUser, signinWithGoogle } = UserAuth();
  const login = async () => {
    setLoading(true);
    try {
      // await signinWithGoogle();
      const queryy = query(UsersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(queryy);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync( form.password , _data.password);
        if( isUser) {
          useAppstate.setLogin(true);
          
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 2000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }

  // useEffect(() => {
  //   if(currentUser) {
  //     navigate("/chat")
  //   }
  // }, [currentUser]);

  return (
    <div className="w-[40%] mx-auto flex flex-col items-center my-32 py-32 rounded-3xl bg-dark">
      <h1 className="font-playfair text-mint font-extrabold text-4xl">Login</h1>
      <div class="p-2 w-full md:w-3/5 ">
        <div class="relative py-2 my-3">
          <label for="mobile" className="text-xl font-medium text-primary ">
            MobileNo
          </label>
          <input
            type={"number"}
            id=""
            name=""
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-gray-300  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-sm shadow-white"
          />
        </div>
      </div>
      <div class="p-2 w-full md:w-3/5">
        <div class="relative">
          <label for="password" className="text-xl font-medium text-primary">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-gray-300  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-sm shadow-white"
          />
        </div>
      </div>
      <div class="p-2 w-1/3 my-2">
        <button
        onClick={login}
        class="flex mx-auto text-secondary bg-mint border-0 py-2 px-8 focus:outline-none hover:bg-secondary/60 hover:text-mint font-medium rounded text-lg"
        >
          {Loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div className="text-lg">
        <p>
          Do not have account?
          <Link to={"/register"}>
            <span className="text-primary ml-2 font-montserrat">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
