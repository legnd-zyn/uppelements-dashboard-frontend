import fetchInstaceServerSide from "./fetchApi/fetchInstanceServerSide";

export default async function fetchCategoriesServer({ type = "posts" } = {}) {
  const res = await fetchInstaceServerSide(`/categories?type=${type}`);
  if (res.ok) {
    const categories = await res.json();
    return categories;
  }
  throw new Error("Couldn't Fetch categories");
}
