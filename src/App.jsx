import { useContext } from "react";
import image1 from "./assets/image1.png";
import { ProductContext } from "./context/ProductContext.jsx";

function App() {
  const { state, dispatch } = useContext(ProductContext);

  const handleInputChange = (e) => {
    dispatch({ type: "SET_INPUT", payload: e.target.value });
  };

  const handleAddProducts = () => {
    dispatch({ type: "ADD_PRODUCT" });
  };

  const handleIncreaseQuantity = (index) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: index });
  };

  const handleDecreaseQuantity = (index) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: index });
  };

  console.log(state.products.length);
  return (
    <div className="flex justify-center items-center font-inter">
      <div className="container drop-shadow-xl pt-12 px-12 w-[800px] h-[900px] bg-[#FFFFFF] mt-6">
        <h2 className="text-2xl font-semibold">Add Products</h2>
        <div className="input-container flex justify-between items-end gap-2 mt-6">
          <div className="input flex flex-col flex-grow gap-1">
            <label htmlFor="text" className="text-sm common-text-color">
              Product
            </label>
            <input
              type="text"
              value={state.productInput}
              onChange={handleInputChange}
              placeholder="e.g Product ABC"
              className="rounded-[4px] pl-3 pr-2 py-2 border-[1px] border-black flex-grow"
            />
          </div>
          <button
            onClick={handleAddProducts}
            disabled={state.productInput.length < 1}
            className={`py-[10px] px-4  ${
              state.productInput.length < 1
                ? "bg-[#F4F4F4] common-text-color"
                : "bg-[#1061C4] text-white"
            } rounded-[4px]`}
          >
            Add
          </button>
        </div>
        {state.products.length > 0 ? (
          <div className="mt-4 overflow-auto h-[700px]">
            {state.products.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-2 py-4 my-1 rounded-sm px-4"
              >
                <div className="text-lg overflow-auto px-2">{product.name}</div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    className="text-[30px] w-4"
                  >
                    -
                  </button>
                  <div className="w-8 rounded-sm bg-[#F4F4F4] text-center">
                    {product.quantity}
                  </div>
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    className="text-[30px] w-4"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container flex justify-center items-center flex-col gap-2 h-[70%]">
            <img src={image1} alt="image" className="size-[60px]" />
            <p className="">No products have been added.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
