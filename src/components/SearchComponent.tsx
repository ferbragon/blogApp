"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { ISearchForm, ISearchErrors } from "@/types/types";
import { searchValidator } from "@/lib/validations";
import CloseButton from "./ui/CloseButton";
import { hideSearch, updatePost } from "@/redux/reducer/actions";
import { NEXT_PUBLIC_DOMAIN } from "@/lib/config";

function SearchComponent() {
  const dispatch = useAppDispatch();
  // Global state
  const searchHidden = useAppSelector((state) => state.myReducer.searchHidden);
  //Local state
  const [searchForm, setSearchForm] = useState<ISearchForm>({
    title: "",
    content: "",
    author: "",
  });
  const [errors, setErrors] = useState<ISearchErrors>({});

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchForm({
      ...searchForm,
      [name]: value,
    });

    setErrors(
      searchValidator({
        ...searchForm,
        [name]: value,
      })
    );
  };

  // Close search and show navbar
  const handleHiddeSearch = () => {
    dispatch(hideSearch(true));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send a POST request to the server with the form data
      const response = await fetch(
        `${NEXT_PUBLIC_DOMAIN}api/posts/searchPosts`,
        {
          method: "POST",
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          // credentials: 'include',
          body: JSON.stringify(searchForm),
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
      dispatch(hideSearch(true));
      setTimeout(() => {
        setSearchForm({
          title: "",
          author: "",
          content: "",
        });
      }, 2500);
    } catch (error) {
      // Handle errors and display an error message
      if (error instanceof Error) {
        setErrors({
          content: "There are no posts with those search parameters",
        });
      }
    }
  };

  return (
    <>
      {!searchHidden ? (
        <div className="fixed top-0 left-0 w-full h-full bg-[#000000ad] z-11 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center">
          <div
            className={`p-6 absolute rounded-lg w-[21rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 background border flex flex-col items-center justify-center overflow-y-auto`}
          >
            <CloseButton handleClose={handleHiddeSearch} />
            <h4 className="text-lg font-bold text-center mb-2">Search by:</h4>
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
                  value={searchForm.title}
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
                      </ul>
                    </div>
                  )}
                </div>

                {/*Author shield*/}
                <input
                  className="rounded-md border mb-6 w-full pl-1 h-[2rem]"
                  id="author"
                  name="author"
                  type="author"
                  onChange={handleChangeForm}
                  value={searchForm.author}
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
                      </ul>
                    </div>
                  )}
                </div>

                {/*Content shield*/}
                <input
                  className="rounded-md border mb-6 w-full pl-1 h-[2rem]"
                  id="content"
                  name="content"
                  type="content"
                  onChange={handleChangeForm}
                  value={searchForm.content}
                  placeholder="Content"
                />

                <div className="h-[1.5rem] mt-[-1.5rem] flex flex-row items-center justify-between">
                  {errors.content && (
                    <div className="text-sm flex flex-row items-center justify-start">
                      <ul className="text-red-600 text-sm text-left">
                        {errors.content ===
                          "The content must be under 50 characters" && (
                          <li>The content must be under 50 characters.</li>
                        )}
                        {errors.content ===
                          "There are no posts with those search parameters" && (
                          <li>There are no posts with those parameters.</li>
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
                Search
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchComponent;
