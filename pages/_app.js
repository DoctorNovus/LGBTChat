import "../styles/tailwind.css";
import "../styles/globals.css";
import "../styles/themes.css";

import NavSidebar from "../components/nav/nav-sidebar/nav-sidebar";

function App({ Component, pageProps }) {
  return (
    <div id="main" className="flex flex-row w-screen h-screen">
      <NavSidebar />
      <Component {...pageProps} />
    </div>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default App;
