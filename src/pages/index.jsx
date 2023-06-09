import Head from "next/head";
import Brands from "@/components/Brands";
import RentalsControl from "@/components/RentalsControl";
import Layout from "@/components/Layout";
import MailList from "@/components/MailList";
import Awards from "@/components/Awards";
import Reviews from "../components/Reviews";
import { loadArray } from "@/utils/api";

export default function Home({ pages }) {
  return (
    <>
      <Head>
        <title>{"Cam's Camera"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pages={pages}>
        <div className="w-full h-6 bg-cam-red"></div>
        <RentalsControl />
        <div className="w-full h-6 bg-cam-red" />
        <Awards />
        <div className="w-full h-6 bg-cam-red" />
        <Reviews />
        <div className="w-full h-6 bg-cam-red" />
        <Brands />
        <div className="w-full h-6 bg-cam-red" />
        <MailList />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pages = await loadArray("/api/paths", "paths");
  return { props: { pages: pages } };
}
