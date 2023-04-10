/* eslint-disable @next/next/no-img-element */
import brands from "@/data/brands";
import { v4 } from "uuid";

export default function Brands() {
  return (
    <div className="mt-4">
      <h1 className="text-center" style={{ textTransform: "none" }}>
        Featured Brands
      </h1>
      <div className="flex flex-row flex-wrap justify-center gap-10 m-4">
        {brands.map((client) => {
          return (
            <div className="w-20 h-auto" key={v4()}>
              <div className="flex flex-col justify-center w-20 h-20 mb-2 overflow-hidden align-middle bg-black rounded-full" style={{
                backgroundImage: `url(${client.logo})`,
                backgroundSize: client.scale,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}/>
              <p className="pt-2 font-semibold text-center text-md">
                {client.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
