import { db, collections } from "@/utils/firebase";
import { v4 } from "uuid";

export default function MailList() {
  const newMailLister = (userMail) => {
    const newId = v4();
    db.collection(collections.mail).doc(newId).set({
      email: userMail,
    });
  };
  return (
    <div>
      <div
        className="w-full h-64 bg-neutral-600 md:h-72 lg:h-96"
        style={{
          backgroundImage: "url(/img/MailListCamera.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "15%",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="relative p-4 text-center text-white top-20 md:top-32 lg:top-1/2">
          <div className="relative p-0 m-0 bottom-4 md:bottom-6 md:text-start md:left-10">
            <h1
              className="drop-shadow-md"
              style={{
                textTransform: "none",
                textAlign: "inherit",
                marginTop: "inherit",
              }}
            >
              Never miss a shot.
            </h1>
            <p className="mt-0.5 text-lg font-medium drop-shadow-md">
              Join our mailing list & stay on top of our gear list.
            </p>
          </div>
          <form
            className="md:relative md:left-10 md:text-start"
            onSubmit={(event) => {
              event.preventDefault();
              const formEmail = event.target.mail_email.value;
              newMailLister(formEmail);
              event.target.mail_email.value = "";
            }}
          >
            <input
              className="py-1 mx-1 rounded-md opacity-50 bg-cam-gray placeholder:text-white placeholder:pl-6"
              placeholder="Email"
              type="email"
              name="mail_email"
              id="mail_email"
            />
            <button
              className="text-center px-3 py-0.5 hover:border-cam-gray border-2 font-medium rounded-md hover:text-cam-gray"
              type="submit"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="w-full h-4 md:h-6 bg-cam-red"></div>
    </div>
  );
}
