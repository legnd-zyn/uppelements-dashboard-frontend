import fetchInstaceClientSide from "./fetchApi/fetchInstanceClientSide";

export default async function fetchCategoriesClient({ type = "posts" } = {}) {
  const res = await fetchInstaceClientSide(`/categories?type=${type}`);
  if (res.ok) {
    const categories = await res.json();
    return categories;
  }
  throw new Error("Couldn't Fetch categories");
}
