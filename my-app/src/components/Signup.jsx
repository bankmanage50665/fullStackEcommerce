import { Form, json, useNavigate, useNavigation } from "react-router-dom";

export default function Signup() {
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:80/users/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw json(
          { message: "Field to create user , Please try again later." },
          { status: 500 }
        );
      }
      navigate("/login");
    } catch (err) {}
  };

  return (
    <>
      <Form
        onSubmit={submitForm}
        className="p-6 bg-stone-200 w-80 h-auto mt-6 m-auto rounded-md shadow-xl md:w-1/2 md:m-auto"
      >
        <div>
          <label
            htmlFor="name"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            disabled={isSubmiting}
            className="px-4 py-1 bg-stone-400 rounded-md hover:font-bold hover:bg-stone-950 hover:text-white"
          >
            {isSubmiting ? "Submiting" : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
}
