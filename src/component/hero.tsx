import { motion } from "framer-motion";
import BgImage from "../assets/bg-image2.jpg";

const ShowDetails = [
  {
    label: "Writers",
    value: "Justin Roiland, Dan Harmon, Brandon Johnson",
  },
  { label: "Program creators", value: "Justin Roiland, Dan Harmon" },
  { label: "First episode date", value: "December 2, 2013 (USA)" },
  {
    label: "Genre",
    value: "Animated sitcom, Adventure, Black comedy, Satire, Science fiction",
  },
  { label: "Network", value: "Adult Swim" },
  {
    label: "Producers",
    value: "J. Michael Mendel (seasons 1–4), Kenny Micka (pilot)",
  },
];

function HeroSection() {
  return (
    <div className="relative w-full h-[300px] md:h-[500px] text-gray-200">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url(${BgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center justify-between h-full px-6"
      >
        <span className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl md:text-5xl font-bold text-center">
            Rick And Morty Episodes
          </h1>
          <p className="mt-4 max-w-2xl text-xs md:text-base text-center">
            Rick, an alcoholic sociopath and scientist, lives with his daughter
            Beth's family. Apart from building gadgets, he takes his morally
            right but dimwit grandson Morty on absurd intergalactic adventures.
          </p>
        </span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-sm:hidden flex flex-col space-y-1 p-4 max-w-3xl text-sm md:text-base opacity-80  bg-black/50 rounded-md"
        >
          {ShowDetails.map((detail, index) => (
            <p key={index} className="text-gray-100">
              <span className="text-gray-300 font-semibold">
                {detail.label}:
              </span>{" "}
              {detail.value}
            </p>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
