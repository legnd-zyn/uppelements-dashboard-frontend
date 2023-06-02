import fetchInstanceClientSide from "./fetchApi/fetchInstanceClientSide";

export default async function fetchMyPosts({ query }) {
  const res = await fetchInstanceClientSide(
    `/posts/my-posts${query ? `?${query}` : ""}`
  );

  console.log(res);

  if (!res.ok) {
    throw new Error("something wen't wrong");
  }

  return res.json();
}
