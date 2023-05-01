import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

interface Store {
  mixedId: string;
  currentChat: string;
  currentChatUID: string;
}

const initialStore: Store = {
  mixedId: "",
  currentChat: "",
  currentChatUID: "",
};

const reducer = (state: Store = initialStore, action: any) => {
  switch (action.type) {
    case "SET_MIXED_UID":
      return { ...state, mixedId: action.payload };
    case "SET_CURRENT_CHAT":
      return { ...state, currentChat: action.payload };
    case "SET_CURRENT_CHAT_UID":
      return { ...state, currentChatUID: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
