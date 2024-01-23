import { IInitialState, IAction } from "../../types/types";

const initialState: IInitialState = {
  data: null,
};

const reducer = (
  state = initialState,
  action: IAction | any
): IInitialState => {
  switch (action.type) {
    // case SELECT_LANGUAGE:
    //   return {
    //     ...state,
    //     language: action.payload === "es" ? "es" : "en",
    //   };
    default:
      return state;
  }
};

export default reducer;
