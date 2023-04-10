/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Nav from "@/components/Header/Nav";
import { loadArray } from "@/utils/api";
import styles from "@/styles/SubPage.module.css";
import { useState } from 'react'
import sendEmail from "@/utils/SendEmail"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Contact({ pages }) {
  const [emailStatusMsg, setEmailStatusMsg] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // add user input to formData obj
    const formData = {
      emailType: "intro",
      userName: e.target.userName.value,
      userEmail: e.target.userEmail.value,
      message: e.target.message.value,
    };
    // run SendEmail(formData) to send email
    sendEmail(formData).then((result) => {
      if (result.status === 200) {
        clearForm(e);
        setEmailStatusMsg(`Email sent!`);
      } else {
        setEmailStatusMsg(`Error: ${result.status} ${result.text}`);
      }
    });
  };

  const clearForm = (e) => {
    e.target.userName.value = null;
    e.target.userEmail.value = null;
    e.target.message.value = null;
  };
  return (
    <>
      <Head>
        <title>{"Cam's Camera"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-auto h-full min-h-screen p-0 m-0 border-0">
          <div className="absolute top-0 w-full bg-cam-gray">
            <img
              className="m-auto w-1/3 max-w-[150px]"
              src="/img/logo3.png"
              alt="cams camera logo"
            />
            <div className={`pt-6 m-0 ${styles.navPos}`}>
              <div className={`w-full m-0 p-0 h-8 ${styles.nav}`}>
                <Nav pages={pages} />
              </div>
            </div>
          </div>
          <div className="absolute w-full h-full pt-6 top-32 md:top-24">
            <div className="w-4/5 m-auto">
              <h1 className="mb-4 text-center">Contact</h1>
              <div className="w-3/5 max-w-[300px] m-auto">
                <p className="text-left">
                  To get in touch, shoot us a message at info@CamsCamera.com
                  call us at (123)456-7891 or fill out this handy form.
                </p>
              </div>
              <div className="w-3/5 pt-4 m-auto">
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="form-email">Email</label>
                    <br />
                    <input
                      className="border-spacing-2 border-cam-gray rounded-md border-[0.1rem] w-10/12"
                      type="text"
                      name="form-email"
                      id="form-email"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-subject">Subject</label>
                    <br />
                    <input
                      className="border-spacing-2 border-cam-gray rounded-md border-[0.1rem] w-10/12"
                      type="text"
                      name="form-subject"
                      id="form-subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-message">Message</label>
                    <br />
                    <textarea
                      className="border-spacing-2 border-cam-gray rounded-md border-[0.1rem] w-10/12"
                      name="form-message"
                      id="form-message"
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    className="px-2 py-1 border-2 rounded-md border-cam-gray"
                    type="submit"
                  >
                    Submit
                  </button>
                  <p>
                    <i>{emailStatusMsg}</i>
                  </p>
                </form>
              </div>
            </div>
            <div className="absolute bottom-0 w-full h-10 bg-cam-red"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const pages = await loadArray("/api/paths", "paths");
  return { props: { pages: pages } };
}
