import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function Nav() {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    fetch("/api/paths")
      .then((res) => {
        res
          .json()
          .then((jres) => {
            setPages(jres.paths);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-screen h-16 text-white bg-gray-600">
      <div className="flex flex-row justify-end gap-4 mx-10">
        {pages.map((page) => {
          return (
            <a href={page} key={v4()}>
              {page === "/"
                ? "Home"
                : page.length > 1
                ? page.split("/")[page.split("/").length - 1]
                : page}
            </a>
          );
        })}
      </div>
    </div>
  );
}
