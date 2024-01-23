import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import CloseButton from "./ui/CloseButton";
import { ISearchForm, ISearchErrors } from "@/types/types";
import { hideCreatePost, updatePost } from "@/redux/reducer/actions";
import { NEXT_PUBLIC_DOMAIN } from "@/lib/config";
import { createPostValidator } from "@/lib/validations";

function CreatePost() {
  const dispatch = useAppDispatch();
  //Global state
  const createPostHidden = useAppSelector(
    (state) => state.myReducer.createPostHidden
  );

  //Local state
  const [createPostForm, setcreatePostForm] = useState<ISearchForm>({
    title: "",
    content: "",
    author: "",
  });
  const [errors, setErrors] = useState<ISearchErrors>({
    content: "All fields are required",
  });

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setcreatePostForm({
      ...createPostForm,
      [name]: value,
    });

    setErrors(
      createPostValidator({
        ...createPostForm,
        [name]: value,
      })
    );
  };

  const handleChangeFormTextArea = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setcreatePostForm({
      ...createPostForm,
      [name]: value,
    });

    setErrors(
      createPostValidator({
        ...createPostForm,
        [name]: value,
      })
    );
  };

  // Close search and show navbar
  const handleHiddeCreatePost = () => {
    dispatch(hideCreatePost(true));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send a POST request to the server with the form data
      const response = await fetch(
        `${NEXT_PUBLIC_DOMAIN}api/posts/createPost`,
        {
          method: "POST",
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          // credentials: 'include',
          body: JSON.stringify(createPostForm),
        }
      );

      if (!response.ok) {
        // Handle errors by throwing an error with the error message
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Reset the form and loading state after a delay
      dispatch(updatePost(data));
      dispatch(hideCreatePost(true));
      setTimeout(() => {
        setcreatePostForm({
          title: "",
          author: "",
          content: "",
        });
      }, 2500);
    } catch (error) {
      // Handle errors and display an error message
      if (error instanceof Error) {
        setErrors({
          content: "Unknown error creating the new post",
        });
      }
    }
  };
  return (
    <>
      {!createPostHidden ? (
        <div className="fixed top-0 left-0 w-full h-full bg-[#000000ad] z-11 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center">
          <div
            className={`p-6 absolute rounded-lg w-[21rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 background border flex flex-col items-center justify-center overflow-y-auto`}
          >
            <CloseButton handleClose={handleHiddeCreatePost} />
            <h4 className="text-lg font-bold text-center mb-2">
              Create a new post:
            </h4>
            <form
              className="w-full h-90 flex flex-col items-evenly justify-between mt-2"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-evenly justify-between">
                {/*title shield*/}
                <input
                  id="title"
                  className="rounded-md border mb-6 w-full pl-1 h-[2rem]"
                  name="title"
                  type="text"
                  onChange={handleChangeForm}
                  value={createPostForm.title}
                  placeholder="Title"
                />

                <div className="h-[1.5rem] mt-[-1.5rem] flex flex-row items-center justify-between">
                  {errors.title && (
                    <div className="text-sm flex flex-row items-center justify-start">
                      <ul className="text-red-600 text-sm text-left">
                        {errors.title ===
                          "The title must be under 25 characters" && (
                          <li>The title must be under 25 characters.</li>
                        )}
                        {errors.title === "Enter a title" && (
                          <li>Enter a title.</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/*Author shield*/}
                <input
                  className="rounded-md border mb-6 w-full pl-1 h-[2rem]"
                  id="author"
                  name="author"
                  type="text"
                  onChange={handleChangeForm}
                  value={createPostForm.author}
                  placeholder="Author"
                />

                <div className="h-[1.5rem] mt-[-1.5rem] flex flex-row items-center justify-between">
                  {errors.author && (
                    <div className="text-sm flex flex-row items-center justify-start">
                      <ul className="text-red-600 text-sm text-left">
                        {errors.author ===
                          "The author must be under 25 characters" && (
                          <li>The author must be under 25 characters.</li>
                        )}
                        {errors.author === "Enter an author" && (
                          <li>Enter an author.</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/*Content shield*/}
                <textarea
                  className="rounded-md border mb-6 w-full pl-1 min-h-[6rem] max-h-[12rem]"
                  id="content"
                  name="content"
                  onChange={handleChangeFormTextArea}
                  value={createPostForm.content}
                  placeholder="Content"
                />

                <div className="h-[1.5rem] mt-[-1.5rem] flex flex-row items-center justify-between">
                  {errors.content && (
                    <div className="text-sm flex flex-row items-center justify-start">
                      <ul className="text-red-600 text-sm text-left">
                        {errors.content ===
                          "The content must be under 250 characters" && (
                          <li>The content must be under 50 characters.</li>
                        )}
                        {errors.content === "Enter a content" && (
                          <li>Enter a content.</li>
                        )}
                        {errors.content === "All fields are required" && (
                          <li>All fields are required.</li>
                        )}
                        {errors.content ===
                          "Unknown error creating the new post" && (
                          <li>Unknown error creating the new post.</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <button
                className={`w-90 flex flex-col items-center justify-center text-center rounded-md mb-2 h-[2rem]
      ${
        Object.keys(errors).length > 0
          ? "bg-red-500 text-red-200"
          : `hover:bg-blue-600 bg-gray-500 text-white`
      }`}
                disabled={Object.keys(errors).length > 0}
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CreatePost;
