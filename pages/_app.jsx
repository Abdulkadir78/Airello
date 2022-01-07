import Meta from "../components/Meta";
import Loader from "../components/UI/Loader";
import useLoader from "../hooks/useLoader";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const { loading } = useLoader();

  return (
    <>
      <Meta />
      {loading ? <Loader /> : <Component {...pageProps} />}
    </>
  );
}

export default App;
