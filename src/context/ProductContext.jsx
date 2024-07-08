import { createContext, useReducer } from "react";

const ProductContext = createContext();

const initialState = {
  productInput: "",
  products: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        productInput: action.payload,
      };
    case "ADD_PRODUCT":
      if (state.productInput.trim() !== "") {
        return {
          ...state,
          products: [
            ...state.products,
            { name: state.productInput, quantity: 1 },
          ],
          productInput: "",
        };
      }
      return state;
    case "INCREASE_QUANTITY":
      return {
        ...state,
        products: state.products.map((product, index) =>
          index === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        products: state.products.map((product, index) =>
          index === action.payload && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
