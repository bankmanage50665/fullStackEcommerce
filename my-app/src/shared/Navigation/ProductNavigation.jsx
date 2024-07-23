import { NavLink } from "react-router-dom";

export default function ProductsNavigation() {
  return (
    <>
      <header>
        <ul>
          <nav className="flex ">
            <li className=" mt-4  py-1 rounded-md mx-2 text-black font-semibold">
              <NavLink
                to=""
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        backgroundColor: "black",
                        padding: "3px 5px",
                        borderRadius: "5px",
                        boxShadow: "2px 2px 2px",
                      }
                    : null
                }
                end
              >
                All products
              </NavLink>
            </li>
            <li className=" mt-4  py-1 rounded-md mx-2 text-black font-semibold">
              <NavLink
                to="add"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        backgroundColor: "black",
                        padding: "3px 5px",
                        borderRadius: "5px",
                        boxShadow: "2px 2px 2px",
                      }
                    : null
                }
                end
              >
                Add products
              </NavLink>
            </li>
            <li className=" mt-4  py-1 rounded-md mx-2 text-black font-semibold">
              <NavLink
                to=":id/edit"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        backgroundColor: "black",
                        padding: "3px 5px",
                        borderRadius: "5px",
                        boxShadow: "2px 2px 2px",
                      }
                    : null
                }
                end
              >
                Edit products
              </NavLink>
            </li>
          </nav>
        </ul>
      </header>
    </>
  );
}
