import Sidebar from "./components/sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="h-full flex items-start">
      <Sidebar />

      <main className="relative flex-grow h-screen overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
