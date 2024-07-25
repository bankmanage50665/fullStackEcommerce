import { Form, json, useNavigate, useNavigation } from "react-router-dom";
import useHttpHooks from "../../hooks/useHttpHook";

export default function Signup() {
  const { sendRequest } = useHttpHooks();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData.entries());

    try {
      const resData = await sendRequest(
        "http://localhost:80/products/add",
        "POST",
        JSON.stringify(productData),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(resData);

      navigate("/products");
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
            htmlFor="description"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Description
          </label>
          <input
            name="description"
            type="text"
            id="description"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            image
          </label>
          <input
            name="image"
            type="text"
            id="image"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            price
          </label>
          <input
            name="price"
            type="number"
            id="price"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="brand"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            brand
          </label>
          <input
            name="brand"
            type="text"
            id="brand"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="material"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            material
          </label>
          <input
            name="material"
            type="text"
            id="material"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            category
          </label>
          <input
            name="category"
            type="text"
            id="category"
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
