import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";


const Nav = () => {
  const links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Explore", link: "/userinfo" },
    { id: 3, name: "About", link: "/about" },
    { id: 4, name: "Blogs", link: "/blogs" },
    { id: 5, name: "Kanban", link: "/kanban" },
    { id: 6, name: "Calendar", link: "/calendar" },
    // { id: 5, name: "INFO ", link: "/userinfo" },
  ];
  let [open, setOpen] = useState(false);
  const useAppstate = useContext(Appstate);

  return (
    <>
      <div className="shadow-md w-full font-montserrat bg-dark top-0 left-0 z-10 sticky">
        <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
          <div className="font-light text-white text-2xl cursor-pointer flex items-center font-[Poppins] ">
            <span className="text-3xl text-white font-playfair mr-4 pt-2 align-middle">
              <ion-icon
                name="logo-ionic"
                className="text-white align-middle"
              ></ion-icon>
            </span>
            <p className="text-mint font-playfair text-3xl tracking-wide font-semibold">
              TravMate
            </p>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ${
              open ? "top-20 opacity-100" : "top-[-490px]"
            } md:opacity-100 opacity-0 `}
          >
            {links.map((item) => (
              <li
                key={item.name}
                className="md:ml-8 text-xl md:my-0 my-7 hover:scale-110 transition duration-300 ease-in-out "
              >
                <a
                  href={item.link}
                  className="text-primary font-poppins hover:text-white "
                >
                  {item.name}
                </a>
              </li>
            ))}
            {useAppstate.login ? (
              <div className="flex">
                <li className=" mx-2">
                  <Link to={"/userinfo"}>
                    <Button>
                      <p className="text-primary font-poppins hover:text-white ">
                        Info
                      </p>
                    </Button>
                  </Link>
                </li>
                <li className="">
                  
                </li>
              </div>
            ) : (
              <li className="">
                <Link to={"/login"}>
                  <Button>
                    <p className="normal-case  text-dark bg-mint rounded-md py-2 text-xl px-4 font-poppins">
                      LOGIN
                    </p>
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
