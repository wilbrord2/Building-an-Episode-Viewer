"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const List = [
  {
    title: "Season",
    options: ["S 1", "S 2", "S 3", "S 4", "clear"],
  },
  {
    title: "Episode",
    options: ["Ep 1", "Ep 2", "Ep 3", "Ep 4", "Ep 5", "clear"],
  },
];

function MovieList() {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-6 py-8 px-4 text-gray-300 max-w-4xl mx-auto">
      {/* filter section */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}

        <span className="flex items-center border border-gray-700 rounded-lg w-full sm:w-2/3 overflow-hidden">
          <input
            type="text"
            placeholder="Search by episode name"
            className="pl-4 py-2 bg-transparent text-white outline-none flex-1"
          />
          <span className="bg-slate-700 p-3 cursor-pointer hover:bg-slate-600 transition">
            <Icon icon="iconamoon:search-bold" width="24" height="24" />
          </span>
        </span>

        {/* Dropdowns */}
        <div className="relative flex gap-6 max-sm:flex-wrap" ref={dropdownRef}>
          {List.map((item, index) => (
            <div key={index} className="relative">
              {/* Dropdown Button */}
              <span
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === item.title ? null : item.title
                  )
                }
                className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition text-gray-500 hover:border-slate-600 border p-3 rounded-md"
              >
                {item.title}:{" "}
                <strong className="text-gray-300 text-nowrap">
                  {item.title === "Season"
                    ? selectedSeason || "Select"
                    : selectedEpisode || "Select"}
                </strong>
                <Icon
                  icon={
                    openDropdown === item.title
                      ? "eva:arrow-up-fill"
                      : "eva:arrow-down-fill"
                  }
                  width="20"
                  height="20"
                />
              </span>

              {/* Dropdown List */}
              <AnimatePresence>
                {openDropdown === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-15 mr-8 left-0  z-50 max-sm:w-36 w-44 bg-gray-800  border-gray-600 rounded-md shadow-lg overflow-hidden"
                  >
                    <ul className="text-white">
                      {item.options.map((option, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            item.title === "Season"
                              ? setSelectedSeason(option)
                              : setSelectedEpisode(option);
                            setOpenDropdown(null);
                            option === "clear" &&
                              (setSelectedSeason(null),
                              setSelectedEpisode(null));
                          }}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
