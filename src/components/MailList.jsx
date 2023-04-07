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
    <form onSubmit={(event) => {
        event.preventDefault();
        const formEmail = event.target.mail_email.value;
        newMailLister(formEmail);
        event.target.mail_email.value = "";
    }}>
      <label htmlFor="email_label">Join the mailing list</label>
      <input type="email" name="mail_email" id="mail_email" />
      <button type="submit">Join</button>
    </form>
  );
}
