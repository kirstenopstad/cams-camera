import { v4 } from "uuid";

export default function Nav({ pages }) {
  return (
    <div className="w-full h-16 text-white bg-gray-600">
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
