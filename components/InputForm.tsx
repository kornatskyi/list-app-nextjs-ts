import { Post } from "@prisma/client";
import React, { SetStateAction } from "react";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form";
import { getPosts, savePost } from "../pages";

export default function InputForm(props: { setPosts: Function }) {
  const { setPosts } = props;

  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      await savePost(data);
      const updatedPosts: Post[] = await getPosts();
      setPosts(updatedPosts);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0"></div>
      <div className="container px-5 py-10 mx-auto flex">
        <form
          onSubmit={onSubmit}
          className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
        >
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Info
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Write post info here
          </p>
          <div className="relative mb-4">
            <label htmlFor="text" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="text" className="leading-7 text-sm text-gray-600">
              Text
            </label>
            <textarea
              {...register("text")}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral
            artisan.
          </p>
        </form>
      </div>
    </section>
  );
}
