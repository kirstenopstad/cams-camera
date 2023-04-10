import Head from "next/head";
import Layout from "@/components/Layout";
import { loadArray } from "@/utils/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Container";
import styles from "@/styles/About.module.css"


export default function About({ pages }) {
  return (
    <>
      <Head>
        <title>{"Cam's Camera"}</title>
        <meta name="description" content="Camera rentals for the film & production community." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pages={pages}>
        <Container>
          <h1>About</h1>
          <div className={styles.content}>
            <img src="/img/about/cam-selfie.jpg" alt="Photographers's self portrait, obscured by camera's reflected image."/>
            <div>
              <h2>Providing leading-edge camera equipment for the film & production community.</h2>
              <p>
              With a set-ready inventory so that you can focus on what you do best.
              </p>
              <p>
              Cam’s Camera started in 2010 in a garage on the East Side of Los Angeles. Since then, it’s grown to a larger garage on the east side of Los Angeles. When not slinging lenses, Cam can be found taking photos and exploring the neighborhood with his kiddo, Cam Jr. 
              </p>
              <p>
              Follow Cam’s #setlife @camscamera.
              </p>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pages = await loadArray("/api/paths", "paths");
  return { props: { pages: pages } };
}
