import React from 'react';
import { NavLink, Link, Form, useRouteLoaderData } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

export default function Footer() {

    return (
        <footer className='w-full'>
            <div className="w-full footer-container fixed bottom-0 left-0 right-0 flex justify-evenly backdrop-blur-sm">

                <NavLink
                    to=""
                    className={({ isActive }) =>
                        ` flex  flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold text-white hover:text-black ${isActive
                            ? 'bg-gray-200 text-custom-blue'
                            : 'text-white hover:bg-gray-100 hover:text-custom-blue'
                        }`
                    }
                >
                    <IoHomeOutline className="h-5 w-5 mb-1" />
                    <span className="text-xs">Home </span>
                </NavLink>

                <NavLink
                    to="products/cart"
                    className={({ isActive }) =>
                        `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold   text-white hover:text-black   ${isActive
                            ? 'bg-gray-200 text-custom-blue'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-custom-blue'
                        }`
                    }
                >
                    <MdOutlineShoppingBag className="h-5 w-5 mb-1" />
                    <span className="text-xs">Shop  </span>
                </NavLink>

                <NavLink
                    to="products/cart"
                    className={({ isActive }) =>
                        `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold  text-white hover:text-black   ${isActive
                            ? 'bg-gray-200 text-custom-blue'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-custom-blue'
                        }`
                    }
                >
                    <MdOutlineShoppingCart className="h-5 w-5 mb-1" />
                    <span className="text-xs">Cart </span>
                </NavLink>

                <NavLink
                    to="products/cart"
                    className={({ isActive }) =>
                        `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold   text-white hover:text-black  ${isActive
                            ? 'bg-gray-200 text-custom-blue'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-custom-blue'
                        }`
                    }
                >
                    <FaRegUserCircle className="h-5 w-5 mb-1" />
                    <span className="text-xs">Orders  </span>
                </NavLink>
            </div>
        </footer>
    );
}