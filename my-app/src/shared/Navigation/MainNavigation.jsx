import { NavLink, Link, Form, useRouteLoaderData } from "react-router-dom";
import Logo from "../../assets/Logo.jfif";

export default function MainNavigation() {
  const token = useRouteLoaderData("token");
  console.log(token);
  return (
    <>
      <header className="w-full h-auto bg-black px-4 py-6">
        <ul className="flex justify-between items-center">
          <nav>
            <li>
              <Link to="">
                <img className="h-12 w-12 rounded-md" src={Logo} />
              </Link>
            </li>
          </nav>
          <nav className="flex ">
            <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
              <NavLink
                to="products/cart"
                style={({ isActive }) => (isActive ? { color: "black" } : null)}
                end
              >
                Cart
              </NavLink>
            </li>

            {!token && (
              <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
                <NavLink
                  to="signup"
                  style={({ isActive }) =>
                    isActive ? { color: "black" } : null
                  }
                  end
                >
                  Signup
                </NavLink>
              </li>
            )}

            {!token && (
              <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
                <NavLink
                  to="login"
                  style={({ isActive }) =>
                    isActive ? { color: "black" } : null
                  }
                  end
                >
                  Login
                </NavLink>
              </li>
            )}

            {token && (
              <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
                <Form action="/logout" method="post">
                  <button>Logout </button>
                </Form>
              </li>
            )}

            <li className="bg-stone-500 px-4 py-1 rounded-md mx-2 text-white font-bold">
              <NavLink
                to="products"
                style={({ isActive }) => (isActive ? { color: "black" } : null)}
                end
              >
                Products
              </NavLink>
            </li>
          </nav>
        </ul>
      </header>
    </>
  );
}
