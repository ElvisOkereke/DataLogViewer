import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

export default function Banner({}: Props) {
  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.2,
        }}
        animate={{
          //social icon animation on refresh
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="flex flex-row items-center"
      >
        <SocialIcon
          url="https://github.com/ElvisOkereke/"
          fgColor="Purple"
          bgColor="transparent"
        />
        <SocialIcon
          url="https://www.linkedin.com/in/elvis-okereke-0b4ba8149/"
          fgColor="Blue"
          bgColor="transparent"
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.2,
        }}
        animate={{
          opacity: 1,
          scale: [0.6, 1.2, 1],
        }}
        transition={{
          duration: 1,
        }}
        className="text-[#F7AB0A] text-3xl font-bold underline"
      >
        DataLog Viewer
      </motion.div>
      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.2,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
      >
        <SocialIcon
          className="cursor-pointer"
          network="email"
          //url=''

          fgColor="grey"
          bgColor="transparent"
        />

        <Link href="#contact">
          <p className="uppercase hidden md:inline-flex text-sm text-gray-300">
            Contact Me!
          </p>
        </Link>
      </motion.div>
    </header>
  );
}
