import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
}

interface SocialItem {
  label: string;
  href: string;
  username?: string;
}

const menuItems: MenuItem[] = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT ME", href: "#about-me" },
  { label: "TECH STACK", href: "#tech-stack" },
  { label: "WORKS", href: "#works" },
  { label: "EXPERIENCE", href: "#experience" },
];

const socialItems: SocialItem[] = [
  {
    label: "GitHub",
    href: "https://github.com",
    username: "github.com/Arthit",
  },
];

const HamburgerButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-6 right-6 z-[60] w-14 h-14 bg-transparent backdrop-blur-2xl backdrop-saturate-100 rounded-full flex justify-center items-center shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.svg
            key="hamburger"
            width="20"
            height="14"
            viewBox="0 0 20 14"
            className="text-gray-400"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <motion.line
              x1="0"
              y1="1"
              x2="20"
              y2="1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
            <motion.line
              x1="0"
              y1="7"
              x2="20"
              y2="7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.line
              x1="0"
              y1="13"
              x2="20"
              y2="13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
          </motion.svg>
        ) : (
          <motion.div
            key="close"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <X size={20} className="text-gray-400" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const MenuOverlay: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setEmail("supertoplnw001@gmail.com");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: {
      clipPath: "circle(0% at 95% 5%)",
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1.0] as const,
      },
    },
    visible: {
      clipPath: "circle(150% at 95% 5%)",
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1.0] as const,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.645, 0.045, 0.355, 1.0] as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Background blur elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            className="flex flex-col lg:flex-row h-full relative z-10 overflow-auto"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Left Section - Menu Navigation */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-16">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <motion.a
                      href={item.href}
                      className="block font-bold text-5xl lg:text-7xl  text-white hover:text-purple-400 transition-colors duration-500 py-2 leading-tight"
                      onClick={onClose}
                      whileHover={{
                        x: 20,
                        transition: { duration: 0.3 },
                      }}
                    >
                      {item.label}
                    </motion.a>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right Section - Contact & Social */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-16 lg:pl-24">
              {/* Email Section */}
              <motion.div variants={itemVariants} className="mb-16">
                <motion.h3
                  className="text-gray-400 text-sm uppercase tracking-wider mb-4"
                  variants={itemVariants}
                >
                  EMAIL ADDRESS
                </motion.h3>
                <motion.a
                  href={`mailto:${email}`}
                  className="text-xl lg:text-2xl text-white hover:text-purple-400 transition-colors duration-300 block"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  {email}
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <div className="space-y-6">
                  {socialItems.map((social) => (
                    <motion.div key={social.label} variants={itemVariants}>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-lg lg:text-xl text-gray-400 hover:text-white transition-colors duration-300"
                        whileHover={{ x: 15 }}
                      >
                        {social.username || social.label}
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServicesMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">
      {/* Hamburger Button */}
      <HamburgerButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default ServicesMenu;
