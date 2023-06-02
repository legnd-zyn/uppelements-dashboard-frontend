import PostContextHolder from "./PostsContextHolder";
import fetchInstanceServerSide from "@/lib/fetchApi/fetchInstanceServerSide";
import ModeratorsBox from "./ModeratorsBox";
import AdminsBox from "./AdminsBox";

export default async function page() {
  const res = await fetchInstanceServerSide("/auth/users/userInfo");
  const adminObj = await res.json();

  return (
    <>
      <PostContextHolder />
      {/* {adminObj?.user && adminObj?.user.role !== "super-admin" ? (
        <ModeratorsBox adminObj={adminObj} />
      ) : (
        <AdminsBox />
      )} */}
    </>
  );
}
