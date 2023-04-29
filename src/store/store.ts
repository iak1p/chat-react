import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

interface Store {
  user: object;
}

const initialStore: Store = {
  user: {},
};

const reducer = (state: Store = initialStore, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
