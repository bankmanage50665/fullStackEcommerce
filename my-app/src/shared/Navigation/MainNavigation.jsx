import React from 'react';
import { NavLink, Link, Form, useRouteLoaderData } from "react-router-dom";
import Logo from "../../assets/Logo.jfif";
import { MdLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function MainNavigation() {
  const token = useRouteLoaderData("token");


  // fixed top-0 left-0 right-0 z-50

  return (
    <header className="w-full px-4 py-3 bg-white bg-opacity-80 backdrop-blur-sm  shadow-md transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-wrap justify-between items-center">
          <li>
            <Link to="" className="block">
              <img className="h-10 w-10 rounded-full" src={Logo} alt="Logo" />
            </Link>
          </li>
          <nav className="flex flex-wrap items-center space-x-1 sm:space-x-2 md:space-x-4">
            <NavLink
              to="products/cart"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold ${isActive
                  ? 'bg-gray-200 text-black'
                  : 'text-gray-600 hover:bg-luxury-gold hover:text-black'
                }`
              }
            >
              <SiGnuprivacyguard className="h-5 w-5 mb-1" />
              <span className="text-xs">Signup</span>
            </NavLink>
            <NavLink
              to="products/cart"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold ${isActive
                  ? 'bg-gray-200 text-custom-blue'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-custom-blue'
                }`
              }
            >
              <MdLogin className="h-5 w-5 mb-1" />
              <span className="text-xs">Login</span>
            </NavLink>


            <Form action="/logout" method="post">
              <button
                type="submit"
                className="flex flex-col  items-center px-3 py-2 rounded-lg bg-custom-red  hover:bg-luxury-gold transition-colors duration-200"
              >
                <FiLogOut className="h-5 w-5 mb-1" />
                <span className="text-xs">Logout</span>
              </button>
            </Form>


            <NavLink
              to="products/cart"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-luxury-gold${isActive
                  ? 'bg-gray-200 text-custom-blue'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-custom-blue'
                }`
              }
            >
              <MdOutlineAdminPanelSettings className="h-5 w-5 mb-1" />
              <span className="text-xs">Admin</span>
            </NavLink>

          </nav>
        </ul>
      </div>
    </header>
  );
}