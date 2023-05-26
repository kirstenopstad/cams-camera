/* eslint-disable @next/next/no-img-element */
import Nav from "./Header/Nav";

export default function Header({ pages }) {
  return (
    <div
      className="w-auto h-full min-h-screen text-white border-0 bg-cam-gray"
      style={{
        backgroundImage: "url(img/inventory/nikon-D850-1.jpg)",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPositionX: "center",
      }}
    >
      <div className="w-auto h-full min-h-screen border-0">
        <div className="absolute w-full mt-2">
          <img
            className="w-1/3 m-auto md:w-1/4 lg:w-2/12"
            src="img/logo3.png"
            alt="cams camera logo"
          />
        </div>
        <div className="pt-24 sm:pt-32 md:pt-3">
          <Nav pages={pages} />
        </div>
        <div className="relative w-10/12 m-auto text-center max-w-[350px] top-20">
          <p className="font-semibold">
            Providing leading-edge camera equipment for the film & production
            community.
          </p>
          <p className="font-thin">
            With a set-ready inventory so that you can focus on what you do
            best.
          </p>
          <a
            className="relative top-16 md:top-36 lg:top-64 text-center px-3 py-0.5 hover:border-cam-gray border-2 font-medium rounded-md hover:text-cam-gray"
            href="#rental-control"
          >
            Pull a Quote
          </a>
        </div>
      </div>
    </div>
  );
}
