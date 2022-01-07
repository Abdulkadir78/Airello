import Link from "next/link";
import Button from "../components/UI/Button";

function Custom404() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-5">
      <h1 className="text-8xl font-brand">404</h1>

      <div className="text-slate-600">
        <p className="text-lg mt-2">
          The page you are looking for does not exist
        </p>
        <p className="text-lg">
          You may have mistyped the url or the page may have moved.
        </p>
      </div>

      <Link href="/" passHref>
        <Button className="mt-7">Go Home</Button>
      </Link>
    </div>
  );
}

export default Custom404;
