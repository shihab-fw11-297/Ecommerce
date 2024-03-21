import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"

const user = { _id: "", login:true }
const Header = () => {
    const [open,setOpen] = useState(false);

    const logoutHandler = () =>{
        setOpen(false)
    }

    return (
        <nav className='header'>
            <div className="leftside">
            <Link onClick={()=> setOpen(false)} to={"/ "}>Home</Link>
            </div>
            
            <div className="rightSide">

            <Link onClick={()=> setOpen(false)}to={"/search"}>
                <FaSearch />
            </Link>
            <Link onClick={()=> setOpen(false)} to={"/cart"}>
                <FaShoppingBag />
            </Link>

            {
                user?.login ? (
                    <>
                    <button onClick={()=> setOpen((prev)=> !prev)}>
                        <FaUser/>    
                    </button>
                    <dialog open={open}>
                        <div>
                            <Link to="/orders">Orders</Link>
                            <button>
                                <FaSignOutAlt/>
                            </button>
                        </div>
                    </dialog>
                    </>
                ) : (
                    <Link onClick={logoutHandler} to={"/login"}>
                        <FaSignInAlt />
                    </Link>
                )
            }
            </div>
        </nav>
    )
}

export default Header