import fetchInstanceServerSide from "@/lib/fetchApi/fetchInstanceServerSide";
import React from "react";
import ModeratorCard from "./ModeratorCard";

export default async function ModeratorCardHolder({ id }) {
  const res = await fetchInstanceServerSide(
    `/auth/users/userInfo?userId=${id}`
  );
  const moderatorObj = await res.json();

  return moderatorObj && <ModeratorCard moderatorObj={moderatorObj} />;
}
