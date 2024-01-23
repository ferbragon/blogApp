import {
  SEARCH_HIDDEN,
  UPDATE_POST,
  CREATE_POST_HIDDEN,
  INTERNET_CONNECTED,
} from "./reduxtypes";
import { IPostCardProps } from "@/types/types";

export const hideSearch = (hide: boolean) => {
  return {
    type: SEARCH_HIDDEN,
    payload: hide,
  };
};

export const updatePost = (posts: IPostCardProps[]) => {
  return {
    type: UPDATE_POST,
    payload: posts,
  };
};

export const hideCreatePost = (hide: boolean) => {
  return {
    type: CREATE_POST_HIDDEN,
    payload: hide,
  };
};

export const changeInternetStatus = (status: boolean) => {
  return {
    type: INTERNET_CONNECTED,
    payload: status,
  };
};
