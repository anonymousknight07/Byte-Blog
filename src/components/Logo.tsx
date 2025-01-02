import Link from "next/link";
import Image from "next/image";

interface Props {
  title?: string;
  className?: string;
  faviconSrc?: string; // Path to the favicon image
}

const Logo = ({ title, className, faviconSrc }: Props) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      {faviconSrc && (
        <Image
          src="https://cdn.sanity.io/images/mnzfyx37/production/b41d3b494d876249a9e145a6f2b9a1e21b26e485-500x500.png" // External favicon URL
          alt="Logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      )}
      <h1 className={`text-3xl font-extrabold uppercase ${className}`}>
        {title || "Akshat Blog"}
      </h1>
    </Link>
  );
};

export default Logo;
