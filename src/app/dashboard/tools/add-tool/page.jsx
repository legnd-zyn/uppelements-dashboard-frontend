"use client";
import React, { useEffect, useRef, useState } from "react";
import ImageUploadPreview from "../../components/ImageUploadPreview";
import { IoIosAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import fetchInstaceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";

export default function page() {
  const subCategInputRef = useRef();
  const [noKeywords, setNoKeywords] = useState(false);

  const [isUploaded, setIsUploaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const NameInputRef = useRef();
  const DescriptionInputRef = useRef();
  const LinkInputRef = useRef();
  const [keyWords, setKeyWords] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    subCategInputRef.current.value = "";
  }, [keyWords.length]);

  function handleSubmit(e) {
    e.preventDefault();
    if (keyWords.length === 0) {
      setNoKeywords(true);
      setTimeout(() => {
        setNoKeywords(false);
      }, 3000);
    }

    try {
      const reader = new FileReader();

      reader.onloadend = async function () {
        const imageData = reader.result.split(",")[1];

        const jsonData = {
          name: NameInputRef.current.value,
          description: DescriptionInputRef.current.value,
          keywords: keyWords,
          link: LinkInputRef.current.value,
          image: {
            data: imageData,
            contentType: selectedImage.type,
          },
        };

        const res = await fetchInstaceClientSide("/ai-tools", {
          method: "POST",

          body: JSON.stringify(jsonData),
        });

        if (res.ok) {
          setIsUploaded(true);
          setTimeout(() => {
            setIsUploaded(false);
          }, 3000);
          resetAll();
        }

        if (!res.ok) {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
      };

      reader.readAsDataURL(selectedImage);
    } catch (error) {}
  }

  function resetAll() {
    NameInputRef.current.value = "";
    LinkInputRef.current.value = "";
    DescriptionInputRef.current.value = "";
    setSelectedImage(null);
    setKeyWords([]);
  }

  return (
    <div className="text-center  max-h-max w-full md:max-w-[80%] m-4 md:p-10 md:mx-auto bg-base-200 p-4 rounded-md border-2 border-gray-500/50 px-10 py-5">
      <div className="prose prose-headings:m-0 max-w-none">
        <h1>Add Tool</h1>
      </div>
      <div className="mt-5 w-max mx-auto flex justify-between gap-10 ">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-10">
          <div>
            <div>
              <label className="label" htmlFor="name">
                <span className="label-text font-bold">Name:</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Tool Name"
                required={true}
                minLength={3}
                className="input input-sm md:input-md w-full"
                ref={NameInputRef}
              />
            </div>
            <div>
              <label className="label" htmlFor="link">
                <span className="label-text font-bold">Link:</span>
              </label>

              <input
                type="link"
                id="link"
                placeholder="Tool Link"
                className="input input-sm md:input-md w-full"
                pattern="^(https?://)[^\s/$.?#].[^\s]*$"
                minLength={6}
                ref={LinkInputRef}
                required
              />
              <div className="px-2">
                <p className="text-gray-500 text-xs w-full max-w-xs text-left mt-0.5">
                  Link must containes http or https and domain extension like
                  .com or .ai
                </p>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="desc">
                <span className="label-text font-bold">Description:</span>
              </label>
              <textarea
                id="desc"
                className="textarea w-full textarea-sm md:textarea-md"
                placeholder="Enter Description Here"
                minLength={20}
                ref={DescriptionInputRef}
                required
              />
            </div>

            <div className="mt-2">
              <button className="btn w-full" type="submit">
                Submit
              </button>
            </div>
            <div className="">
              {isUploaded && (
                <p className="bg-green-600 text-white font-bold text-center p-2 rounded-md text-sm mt-2">
                  Successfully uploded
                </p>
              )}
              {isError && (
                <p className="bg-red-600 text-white font-bold text-center p-2 rounded-md text-sm mt-2">
                  Something wen&apos;t wrong! retry
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-evenly">
            <ImageUploadPreview
              setSelectedImage={setSelectedImage}
              isUploaded={isUploaded}
            />
            <div className="form-control">
              {keyWords?.length > 0 && (
                <div className="w-full">
                  <ul className="w-full flex flex-wrap max-w-[250px] gap-2">
                    {keyWords.map((item, ind) => (
                      <li
                        key={ind}
                        className="relative max-w-max px-4 py-2 bg-neutral rounded-full text-secondary group cursor-pointer text-sm"
                        onClick={() =>
                          setKeyWords((prev) =>
                            prev.filter((subCateg) => subCateg !== item)
                          )
                        }
                      >
                        <span className="text-neutral-content">{item}</span>
                        <span className="absolute top-0 left-0 w-full h-full hidden group-hover:flex justify-center items-center bg-neutral z-20 rounded-full">
                          <CiCircleRemove size={"1.25rem"} color={"red"} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="input-group mt-2">
                <input
                  type="text"
                  placeholder="Add Keyword"
                  className="input outline-none focus:outline-none"
                  ref={subCategInputRef}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      setKeyWords((prev) => {
                        if (subCategInputRef.current.value) {
                          return [
                            ...new Set([
                              ...prev,
                              subCategInputRef.current.value,
                            ]),
                          ];
                        }
                        return prev;
                      });
                    }
                  }}
                />
                <button
                  className="btn btn-square"
                  type="button"
                  onClick={() =>
                    setKeyWords((prev) => {
                      if (subCategInputRef.current.value) {
                        return [
                          ...new Set([...prev, subCategInputRef.current.value]),
                        ];
                      }
                      return prev;
                    })
                  }
                >
                  <IoIosAdd />
                </button>
              </div>
              {noKeywords && (
                <div className="text-sm p-2 text-left text-red-500">
                  <p className="">Please add atleast one keyword</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
