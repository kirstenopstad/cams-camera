import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, pages }) {
  return (
    <div className="w-full h-auto p-0 m-0 overflow-hidden">
      <Header pages={pages} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
