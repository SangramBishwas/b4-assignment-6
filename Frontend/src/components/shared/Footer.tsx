"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import bkash from "../../assets/bkash.svg";
import nagad from "../../assets/nagad.svg";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/mastercard.svg";
import microsoft from "../../assets/microsoft.svg";
import google from "../../assets/googleplay.svg";
import appstore from "../../assets/appstore.svg";

const aboutLinks = [
  "About Us",
  "Privacy Policy",
  "Cookie Policy",
  "Terms & Conditions",
  "Why Shop With Us",
  "Asmart Store",
  "Asmart Blog",
];

const helpLinks = [
  "Payment",
  "Shipping",
  "Return And Replacement",
  "Chat With Us",
  "Asmart Support",
];

const socialIcons = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <RxCross1 />, href: "#" },
  { icon: <FaYoutube />, href: "#" },
];

const paymentIcons = [
  { icon: bkash, href: "#" },
  { icon: nagad, href: "#" },
  { icon: visa, href: "#" },
  { icon: mastercard, href: "#" },
];

const downloadButtons = [
  {
    icon: google,
    alt: "Google Play",
  },
  {
    icon: appstore,
    alt: "App Store",
  },
  {
    icon: microsoft,
    alt: "App Gallery",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-[#ffffff] px-8 md:px-16 py-10 font-madimi">
      <div className="grid md:grid-cols-4 gap-8 border-b-2 border-white/20 pb-8">
        {/* Logo and contact */}
        <div>
          <h1 className="text-3xl font-bold mb-3 font-lobster">AsMart</h1>
          <p className="mb-5">Second Hand Market Bangladesh Limited</p>
          <div className="flex items-start gap-2 text-sm mb-1">
            <MdLocationOn className="text-xl" />
            <span>9 KA/KHA, Level 5 Dhaka - 1215</span>
          </div>
          <div className="flex items-center gap-2 text-sm mb-1">
            <MdPhone className="text-xl" />
            <span>+8801234567890</span>
          </div>
          <div className="flex items-center gap-2 text-sm mb-4">
            <MdEmail className="text-xl" />
            <span>support@asmart.com</span>
          </div>
          <div className="flex gap-3 mt-7 text-lg">
            {socialIcons.map((item, idx) => (
              <Link key={idx} href={item.href} className="hover:text-gray-300">
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* About links */}
        <div>
          <h2 className="font-bold text-xl mb-3">About</h2>
          {aboutLinks.map((link) => (
            <p key={link} className="mb-2 hover:text-gray-300 cursor-pointer">
              {link}
            </p>
          ))}
        </div>

        {/* Help links */}
        <div>
          <h2 className="font-bold text-xl mb-3">Help</h2>
          {helpLinks.map((link) => (
            <p key={link} className="mb-2 hover:text-gray-300 cursor-pointer">
              {link}
            </p>
          ))}
        </div>

        {/* App Downloads */}
        <div>
          <h2 className="font-bold text-xl mb-3">Download</h2>
          <div className="flex flex-col gap-3">
            {downloadButtons.map(({ icon: src, alt }, i) => (
              <Image
                key={i}
                src={src}
                alt={alt}
                width={150}
                height={60}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between text-sm mt-6 gap-3">
        <p>
          Copyright &copy; {new Date().getFullYear()} AsMart | All Rights
          Reserved.
        </p>
        <div className="flex sm:flex-row flex-col items-center gap-2">
          <span>Payment Methods</span>
          <div className="flex items-center gap-2">
            {paymentIcons.map((item, idx) => (
              <Link key={idx} href={item.href} className="hover:text-gray-300">
                <Image
                  className="cursor-pointer bg-white rounded-sm"
                  src={item.icon}
                  alt="payment"
                  width={40}
                  height={40}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
