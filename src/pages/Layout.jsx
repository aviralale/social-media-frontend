import Navbar from "./components/Misc/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="grid w-[100vw] h-[100%] place-items-center">
        <div className="mb-8"></div>
        {children}
        <Navbar />
      </div>
    </>
  );
}
