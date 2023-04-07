/* eslint-disable @next/next/no-html-link-for-pages */
import { v4 } from "uuid";

export default function Nav({ pages }) {
  return (
    <div className="w-full h-16 text-2xl font-semibold text-white">
      <div className="flex flex-row-reverse justify-center gap-4 pt-24 mx-10 sm:pt-32 md:justify-start md:pt-3">
        {pages.map((page) => {
          return (
            <a className="hover:text-cam-red drop-shadow-md lg:px-4" href={page} key={v4()}>
              {page === "/"
                ? null
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
