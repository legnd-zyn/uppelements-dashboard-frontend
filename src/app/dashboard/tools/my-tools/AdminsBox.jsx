import fetchInstaceServerSide from "@/lib/fetchApi/fetchInstanceServerSide";
import React from "react";
import ModeratorCardHolder from "./components/ModeratorCardHolder";

async function fetchAdminsModerators() {
  const res = await fetchInstaceServerSide("/auth/users/super-admin");

  return res.json();
}

export default async function AdminsBox() {
  const { admins, moderators } = await fetchAdminsModerators();

  return (
    <div className="px-10 mt-10">
      <div className="prose prose-headings:text-gray-700 my-5">
        <h1>Admins</h1>
      </div>
      <div className="flex flex-wrap gap-5">
        {admins &&
          admins.map((id, ind) => <ModeratorCardHolder id={id} key={ind} />)}
      </div>
      <div className="prose prose-headings:text-gray-700 my-5">
        <h1>Moderators</h1>
      </div>

      {moderators &&
        moderators.map((id, ind) => <ModeratorCardHolder id={id} key={ind} />)}
    </div>
  );
}
