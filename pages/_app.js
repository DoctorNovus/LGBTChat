import "../styles/tailwind.css";
import "../styles/globals.css";

import NavSidebar from "../components/nav/nav-sidebar/nav-sidebar";

function MyApp({ Component, pageProps }) {
    return (
        <div className="flex flex-row">
            <NavSidebar />
            <Component {...pageProps} />
        </div>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;