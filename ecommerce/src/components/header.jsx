import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import Logo from '../assets/logo.png';


const Header = ({ user }) => {
    const [open, setOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Sign Out Successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Sign Out Fail");
        }
    };

    return (
        <nav className='header'>
            <div className="leftside">
                <Link onClick={() => setOpen(false)} to={"/ "}>
                    <img src={Logo} alt="logo" style={{  height: '25px',objectFit:'cover' }} />
                </Link>
            </div>

            <div className="rightSide">

                <Link onClick={() => setOpen(false)} to={"/search"}>
                    <FaSearch />
                </Link>
                <Link onClick={() => setOpen(false)} to={"/cart"}>
                    <FaShoppingBag />
                </Link>

                {
                    user?._id ? (
                        <>
                            <button onClick={() => setOpen((prev) => !prev)}>
                                <FaUser />
                            </button>
                            <dialog open={open}>
                                <div>
                                    <Link to="/orders">Orders</Link>
                                    <button onClick={logoutHandler}>
                                        <FaSignOutAlt />
                                    </button>
                                </div>
                            </dialog>
                        </>
                    ) : (
                        <Link to={"/login"}>
                            <FaSignInAlt />
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Header