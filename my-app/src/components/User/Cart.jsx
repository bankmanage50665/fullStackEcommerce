import { useContext } from "react";
import CartContext from "../../context/CartContext";
export default function Cart() {
  const { items } = useContext(CartContext);
  console.log(items);
  return (
    <>
      <h1>Items</h1>
    </>
  );
}
