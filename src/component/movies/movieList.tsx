import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEpisodes, fetchSingleEpisodes } from "../../api";
import { EpisodesResponse, EpisodeType } from "../../../types";

const List = [
  {
    title: "Season",
    options: [1, 2, 3, 4, 5],
  },
  {
    title: "Episode",
    options: Array.from({ length: 51 }, (_, index) => index + 1), 
  },
];


function MovieList() {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredEpisodes, setFilteredEpisodes] = useState<
    EpisodeType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [episodesData, setEpisodesData] = useState<EpisodesResponse>({
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSelectedSeason(null);
        setSelectedEpisode(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchEpisodes(`episode?page=${currentPage}`)
      .then((data) => {
        if (data) {
          setEpisodesData(data);
          setFilteredEpisodes(data.results);
        }
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  useEffect(() => {
    let filtered = episodesData.results;

    if (searchTerm) {
      filtered = filtered.filter((ep) =>
        ep.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSeason) {
      filtered = filtered.filter((ep) =>
        ep.episode.includes(`S0${selectedSeason}`)
      );
    }
    setFilteredEpisodes(filtered);
  }, [searchTerm, selectedSeason, episodesData]);

  const handleEpisode = async (value: number) => {
    setLoading(true);
    const data = await fetchSingleEpisodes(`episode/[${value}]`);
     setFilteredEpisodes(data);
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= episodesData.info.pages) {
      setCurrentPage(page);
    }
  };
  // console.log({filteredEpisodes, episodesData})
  return (
    <div className="flex flex-col gap-6 py-8 px-4 text-gray-300 max-w-4xl mx-auto">
      {/* Filter Section */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <span className="flex items-center border border-gray-700 rounded-lg w-full sm:w-2/3 overflow-hidden">
          <input
            type="text"
            placeholder="Search by episode name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                    className="absolute top-15 mr-8 left-0 h-64 overflow-y-scroll z-50 max-sm:w-36 w-44 bg-gray-800  border-gray-600 rounded-md shadow-lg overflow-hidden"
                  >
                    <ul className="text-white">
                      {item.options.map((option, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            item.title === "Season"
                              ? setSelectedSeason(option)
                              : (handleEpisode(option),
                                setSelectedEpisode(option));
                            setOpenDropdown(null);
                          }}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition"
                        >
                          {item.title === "Season" ? "S " : "Ep "}
                          {option}
                        </li>
                      ))}
                      <li
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition"
                        onClick={() => {
                          setSelectedSeason(null),
                            setOpenDropdown(null),
                            setSelectedEpisode(null);
                        }}
                      >
                        Clear
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      Episodes List
      <h1 className="text-xl font-semibold">
        Episodes ({filteredEpisodes.length})
      </h1>
      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <Icon
            icon="eos-icons:loading"
            width="40"
            height="40"
            className="animate-spin"
          />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEpisodes.map((ep) => (
            <li
              key={ep.id}
              className="flex flex-col p-4 bg-gray-900 rounded-md shadow-md hover:bg-gray-800 hover:scale-105 hover:duration-300 transition cursor-pointer"
            >
              <span className="text-lg font-semibold">{ep.name}</span>
              <span className="text-gray-400 text-sm">{ep.air_date}</span>
              <span className="text-gray-400 text-xs">{ep.episode}</span>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {episodesData.info.pages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          disabled={currentPage >= episodesData.info.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieList;
