import React from "react";
import CardLevel01 from "./../CardLevel01/CardLevel01";

export default function Level01() {
  return (
    <>
      <div className="[background:linear-gradient(to_left,#3533CC,#000003)] min-h-screen">
        <div className=" text-center text-white text-5xl font-bold pt-32 md:pt-20 ">
          <h1>Level 1 courses</h1>
        </div>
        <div class="w-[90%] mx-auto pb-32 pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {/* {allLevel01Courses?.map((Courses) => (
            <CardLevel01 Courses={Courses} key={Courses._id} />
          ))} */}

          <CardLevel01 />
        </div>
      </div>
    </>
  );
}
