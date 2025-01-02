import Link from "next/link";
import { IconType } from "react-icons";

interface SocialLinkProps {
  href: string;
  icon: IconType;
  label: string;
}

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-[#251e56] hover:text-[#773f25] duration-200"
    >
      <Icon className="text-2xl" />
      <span className="text-lg">{label}</span>
    </Link>
  );
};

export default SocialLink;