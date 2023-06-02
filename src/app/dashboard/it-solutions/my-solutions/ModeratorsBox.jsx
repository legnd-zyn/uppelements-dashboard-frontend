import React from "react";
import ModeratorCardHolder from "./components/ModeratorCardHolder";

export default function ModeratorsBox({ adminObj }) {
  return (
    <>
      {adminObj?.user?.moderators && (
        <>
          <div className="prose m-4 mt-10 md:mt-20 md:mx-auto text-center uppercase">
            <h1>Moderators</h1>
          </div>
          <div className="w-full p-4 md:p-10">
            {adminObj?.user.moderators.map((id, ind) => (
              <ModeratorCardHolder id={id} key={ind} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
