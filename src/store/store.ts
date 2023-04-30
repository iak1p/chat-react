import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

interface Store {
  user: object;
  mixedId: string;
}

const initialStore: Store = {
  user: {},
  mixedId: "",
};

const reducer = (state: Store = initialStore, action: any) => {
  switch (action.type) {
    case "SET_MIXED_UID":
      return { ...state, mixedId: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
