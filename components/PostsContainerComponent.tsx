import React from "react";

export default function PostsContainerComponent(props: any) {
  return (
    <section className="relative">
      <div className=" inset-0 flex  flex-col-reverse">{props.children}</div>
    </section>
  );
}
