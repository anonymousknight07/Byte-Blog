import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import SocialLink from "./SocialLink";

const AboutContent = () => {
  const socials = [
    {
      href: "https://github.com/anonymousknight07",
      icon: BsGithub,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/akshatpandey07/",
      icon: BsLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/akshat___pandey07/",
      icon: BsInstagram,
      label: "Instagram",
    },
    {
      href: "https://x.com/akshath_pandey",
      icon: FaXTwitter,
      label: "X (Twitter)",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#251e56] mb-6">About Me</h2>
        <div className="space-y-4 text-gray-700 mb-8">
          <p>
            Welcome to my blog! I&apos;m a passionate writer and technology enthusiast who loves to share insights and experiences through writing.
          </p>
          <p>
            My journey in the tech world has been filled with continuous learning and growth. Through this blog, I aim to share my knowledge and experiences with others.
          </p>
          <p>
            When I&apos;m not writing or coding, you can find me exploring new technologies, reading tech blogs, or contributing to open-source projects.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#251e56]">Connect with me</h3>
          <div className="flex flex-col gap-4">
            {socials.map((social) => (
              <SocialLink
                key={social.label}
                href={social.href}
                icon={social.icon}
                label={social.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;