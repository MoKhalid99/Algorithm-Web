import React from "react";
import CardGames from "../CardGames/CardGames";

export default function Games() {
  return (
    <>
      <div className="[background:linear-gradient(to_right,#0F1D40,#442063)] min-h-screen">
        <div className=" text-center text-white text-6xl font-bold pt-32 md:pt-20 ">
          <h1>Game</h1>
        </div>
        <div className=" w-[90%] mx-auto pb-32 pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* {allLevel01Courses?.map((Courses) => (
                <CardLevel04 Courses={Courses} key={Courses._id} />
              ))} */}

          <CardGames />
        </div>
      </div>
    </>
  );
}
