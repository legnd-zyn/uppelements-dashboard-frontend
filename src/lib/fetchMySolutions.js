import fetchInstanceClientSide from "./fetchApi/fetchInstanceClientSide";

export default async function fetchMyPosts({ query }) {
  const res = await fetchInstanceClientSide(
    `/it-solutions/my-solutions${query ? `?${query}` : ""}`
  );

  console.log(res);

  if (!res.ok) {
    throw new Error("something wen't wrong");
  }

  return res.json();
}
