import {
  Form,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { useState } from "react";
import ImageUpload from "../../shared/ImageUpload";
import { userId } from "../../middleware/getToken"

export default function Signup() {
  const [files, setFiles] = useState([]);
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const navigate = useNavigate();
  const token = useRouteLoaderData("token");
  const userid = userId()


  console.log(userid)

  function handleGetImg(img) {
    setFiles(img);
  }




  const submitForm = async (e) => {
    e.preventDefault();
    const productData = e.target.elements;



    try {
      const formData = new FormData();
      formData.append("name", productData.name.value);
      formData.append("description", productData.description.value);
      formData.append("price", productData.price.value);
      formData.append("brand", productData.brand.value);
      formData.append("category", productData.category.value);
      formData.append("creator", userid)
      files.forEach((files) => formData.append("image", files));

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/add`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Include the authentication token
        },

      });
      const resData = await res.json();
      console.log(resData);


    } catch (err) { }




    navigate("/products");
  };

  return (
    <>
      <Form
        onSubmit={submitForm}
        className="w-auto h-auto p-6 bg-stone-200  mt-6 m-auto rounded-md shadow-xl"
      >
        <div>
          <label
            htmlFor="name"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Product  Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            required
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
            required
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
            required
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
            required
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
            required
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <ImageUpload onChangeImages={handleGetImg} />

        <div className="mb-20">
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
