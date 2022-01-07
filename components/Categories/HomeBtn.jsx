import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";

function HomeBtn() {
  return (
    <Link href="/" passHref>
      <button className="flex">
        <IoIosArrowRoundBack className="text-gray-600" size={25} />
        <span className="text-gray-600">Home</span>
      </button>
    </Link>
  );
}

export default HomeBtn;
