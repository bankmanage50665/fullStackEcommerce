import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.jfif";

export default function MainNavigation() {
  return (
    <>
      <header className="w-full h-auto bg-black px-4 py-6">
        <ul className="flex justify-between items-center">
          <nav>
            <li>
              <img className="h-12 w-12 rounded-md" src={Logo} />
            </li>
          </nav>
          <nav className="flex ">
            <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
              <NavLink
                to=""
                style={({ isActive }) => (isActive ? { color: "black" } : null)}
                end
              >
                Home
              </NavLink>
            </li>
            <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
              <NavLink
                to="about"
                style={({ isActive }) => (isActive ? { color: "black" } : null)}
                end
              >
                About
              </NavLink>
            </li>
            <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
              <NavLink
                to="contact"
                style={({ isActive }) => (isActive ? { color: "black" } : null)}
                end
              >
                Contact
              </NavLink>
            </li>
          </nav>
        </ul>
      </header>
    </>
  );
}
