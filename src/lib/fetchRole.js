import fetchInstanceServerSide from "./fetchApi/fetchInstanceServerSide";

export default async function fetchRole() {
  const res = await fetchInstanceServerSide("/role");
  if (!res.ok) {
    return null;
  }
  return (await res?.json()).role;
}
