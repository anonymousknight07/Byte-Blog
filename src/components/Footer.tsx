"use client";

import React from "react";
import Container from "./Container";
import Link from "next/link";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#251e56]/90 to-[#0a0a0bb8]/90 text-gray-100 py-8 sm:py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src="https://cdn.sanity.io/images/mnzfyx37/production/b41d3b494d876249a9e145a6f2b9a1e21b26e485-500x500.png"
              alt="Footer Icon"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
            <NewsletterForm />
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <h3 className="text-lg font-semibold">Connect With Me</h3>
            <div className="flex items-center gap-4 sm:gap-7">
              <Link href="https://github.com/anonymousknight07" target="_blank">
                <BsGithub className="text-lg sm:text-xl md:text-2xl hover:text-[#251e56] duration-200 cursor-pointer" />
              </Link>
              <Link href="https://www.linkedin.com/in/akshatpandey07/" target="_blank">
                <BsLinkedin className="text-lg sm:text-xl md:text-2xl hover:text-[#251e56] duration-200 cursor-pointer" />
              </Link>
              <Link href="https://www.instagram.com/akshat___pandey07/" target="_blank">
                <BsInstagram className="text-lg sm:text-xl md:text-2xl hover:text-[#251e56] duration-200 cursor-pointer" />
              </Link>
              <Link href="https://x.com/akshath_pandey" target="_blank">
                <FaXTwitter className="text-lg sm:text-xl md:text-2xl hover:text-[#251e56] duration-200 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;