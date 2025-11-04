import { getImagePrefix } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src= {`${getImagePrefix()}images/logo/logo.svg`}
        alt="logo"
        width={160}
        height={50}
        style={{ width: "20%", height: "20%" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
