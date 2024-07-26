import { useRef, useState } from "react";

export default function ImageUpload({ onChangeImages }) {
  const [previewUrl, setPreviewUrl] = useState();
  const [file, setFile] = useState();
  const imgRef = useRef();

  function handleOnChange(e) {
    const files = Array.from(e.target.files);
    setFile(files);
    const previewUrl = files.map((file) => URL.createObjectURL(file));
    setPreviewUrl(previewUrl);
    onChangeImages(files);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", "Rahul");
    formData.append("email", "r@gmail.com");
    formData.append("password", "11111111");
    file.forEach((file) => formData.append("image", file));
    const res = await fetch("http://localhost:80/users/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    console.log(res);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={imgRef}
            multiple
            onChange={handleOnChange}
          />
        </div>
        <div>
          {previewUrl &&
            previewUrl.length > 0 &&
            previewUrl.map((url, index) => (
              <img
                src={url}
                key={index}
                alt="Preview img"
                className="w-40 h-40 object-cover flex flex-row"
              />
            ))}
        </div>
        <button>Submit form </button>
      </form>
    </>
  );
}
