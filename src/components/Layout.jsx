import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, pages }) {
  return (
    <>
      <Header pages={pages} />
        <main>{children}</main>
      <Footer />
    </>
  );
}
