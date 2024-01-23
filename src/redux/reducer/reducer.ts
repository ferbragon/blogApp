import { IInitialState, IAction } from "../../types/types";
import {
  CREATE_POST_HIDDEN,
  INTERNET_CONNECTED,
  SEARCH_HIDDEN,
  UPDATE_POST,
} from "./reduxtypes";

const initialState: IInitialState = {
  data: null,
  searchHidden: true,
  createPostHidden: true,
  internetConnected: true,
};

const reducer = (
  state = initialState,
  action: IAction | any
): IInitialState => {
  switch (action.type) {
    case UPDATE_POST:
      if (typeof action.payload === "object") {
        return {
          ...state,
          data: action.payload,
        };
      }
    case SEARCH_HIDDEN:
      if (typeof action.payload === "boolean") {
        return {
          ...state,
          searchHidden: action.payload,
        };
      }
    case CREATE_POST_HIDDEN:
      if (typeof action.payload === "boolean") {
        return {
          ...state,
          createPostHidden: action.payload,
        };
      }
    case INTERNET_CONNECTED:
      if (typeof action.payload === "boolean") {
        return {
          ...state,
          internetConnected: action.payload,
        };
      }
    default:
      return state;
  }
};

export default reducer;
