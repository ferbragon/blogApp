import React from "react";
import Image from "next/image";
import plusIcon from "../../../public/plus-icon.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { hideCreatePost } from "@/redux/reducer/actions";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AddPostButton() {
  const dispatch = useAppDispatch();
  // Global state
  const createPostHidden = useAppSelector(
    (state) => state.myReducer.createPostHidden
  );

  const internetConnected = useAppSelector(
    (state) => state.myReducer.internetConnected
  );

  const handleShowCreatePost = () => {
    dispatch(hideCreatePost(!createPostHidden));
  };
  return (
    <>
      {!internetConnected ? (
        <div className="fixed bottom-[25px] right-[25px] backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="max-w-[25rem]">
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>No internet connection.</AlertDescription>
            </Alert>
          </div>
        </div>
      ) : (
        createPostHidden && (
          <button
            className="fixed rounded-md w-[55px] h-[55px] bottom-[25px] right-[25px] backdrop-filter backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center"
            onClick={handleShowCreatePost}
          >
            <Image
              alt="plus icon"
              src={plusIcon}
              className="object-cover h-[60px] w-[60px]"
            />
          </button>
        )
      )}
    </>
  );
}

export default AddPostButton;
