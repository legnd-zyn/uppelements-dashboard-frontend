import Image from "next/image";
import Illustration from "./images/landing-page.png";
import fetchRole from "@/lib/fetchRole";
import Link from "next/link";
import AuthValidButtons from "./components/AuthValidButtons";

export default async function Home() {
  const role = await fetchRole();

  if (!role) {
    throw new Error("Something went wrong on our server");
  }

  return (
    <>
      <main className="flex h-full flex-col items-center justify-center p-10  md:p-24 bg-base-100 hero-section container mx-auto">
        <div className="container grid gap-10 md:grid-cols-2 relative mx-auto">
          <div className="relative w-full h-full prose prose-headings:text-gray-700 prose-p:text-gray-500 flex justify-center flex-col">
            <h1 className="">
              It's always a pleasure to see you,{" "}
              <span className="text-primary-focus">Admin.</span>
            </h1>

            <p>
              Let's combine our <span className="font-bold">technical </span>
              skills to innovate and create solutions that will{" "}
              <span className="font-bold">shape </span>
              the future.
            </p>
            <AuthValidButtons role={role} />
          </div>
          <div className="relative h-max flex justify-center items-center">
            <Image src={Illustration} />
          </div>
        </div>
      </main>
    </>
  );
}
