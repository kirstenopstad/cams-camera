/* eslint-disable @next/next/no-html-link-for-pages */
import { v4 } from "uuid";
import Link from "next/link";

export default function Nav({ pages }) {
  return (
    <div className="w-full text-2xl font-semibold text-white">
      <div className="flex flex-row-reverse justify-center gap-4 mx-10 md:justify-start">
        {pages.map((page) => {
          return (
            <Link
              className="hover:text-cam-red drop-shadow-md lg:px-4"
              href={page}
              key={v4()}
            >
              {page === "/"
                ? null
                : page.length > 1
                ? page.split("/")[page.split("/").length - 1]
                : page}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
