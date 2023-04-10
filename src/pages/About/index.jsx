/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Nav from "@/components/Header/Nav";
import { loadArray } from "@/utils/api";
import styles from "@/styles/SubPage.module.css";
import Link from "next/link";
import AboutStyles from "@/styles/About.module.css";

export default function About({ pages }) {
  return (
    <>
      <Head>
        <title>{"Cam's Camera"}</title>
        <meta
          name="description"
          content="Camera rentals for the film & production community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="w-auto h-full min-h-screen p-0 m-0 border-0">
          <div className="absolute top-0 w-full bg-cam-gray">
            <Link href="/">
              <img
                className="m-auto w-1/3 max-w-[150px]"
                src="/img/logo3.png"
                alt="cams camera logo"
              />
            </Link>
            <div className={`pt-6 m-0 ${styles.navPos}`}>
              <div className={`w-full m-0 p-0 h-8 ${styles.nav}`}>
                <Nav pages={pages} />
              </div>
            </div>
          </div>
          <div className="pt-32 md:pt-20">
            <h1>About</h1>
            <div className={AboutStyles.content}>
              <img
                src="/img/about/cam-selfie.jpg"
                alt="Photographers's self portrait, obscured by camera's reflected image."
              />
              <div>
                <h2>
                  Providing leading-edge camera equipment for the film &
                  production community.
                </h2>
                <p>
                  With a set-ready inventory so that you can focus on what you
                  do best.
                </p>
                <p>
                  Cam’s Camera started in 2010 in a garage on the East Side of
                  Los Angeles. Since then, it’s grown to a larger garage on the
                  east side of Los Angeles. When not slinging lenses, Cam can be
                  found taking photos and exploring the neighborhood with his
                  kiddo, Cam Jr.
                </p>
                <p>Follow Cam’s #setlife @camscamera.</p>
              </div>
            </div>
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
