import React from "react";
import CardLevel02 from "./../CardLevel02/CardLevel02";

export default function Level02() {
  return (
    <>
      <div className="bg-(image:--backgrounds-Level02BackGround) min-h-screen bg-cover bg-center bg-no-repeat ">
        <div className=" text-center text-white text-5xl font-bold pt-32 md:pt-20 ">
          <h1>Level 2 courses</h1>
        </div>
        <div class=" w-[90%] mx-auto pb-32 pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* {allLevel01Courses?.map((Courses) => (
                <CardLevel02 Courses={Courses} key={Courses._id} />
              ))} */}

          <CardLevel02 />
        </div>
      </div>
    </>
  );
}
