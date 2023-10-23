import "@src/styles/globals.css";
import Nav from "@src/components/Nav";
import Provider from "@src/components/Provider";

export const metadata = {
  title: "MouseLink",
  description: "Discover & share links",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="w-full app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
