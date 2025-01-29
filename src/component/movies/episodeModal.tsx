import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEpisodes, fetchSingleCharacter } from "../../api";
import profile from "../../assets/image1.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import CharacterCard from "./characterCard";
import { CharacterType, EpisodeType } from "../../../types";

interface EpisodeModalProps {
  episodeId: number | null;
  onClose: () => void;
}

const EpisodeModal: React.FC<EpisodeModalProps> = ({ episodeId, onClose }) => {
  const [episode, setEpisode] = useState<EpisodeType | null>(null);
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!episodeId) return;

    setLoading(true);
    getEpisodes(`episode/${episodeId}`)
      .then((data) => {
        setEpisode(data);
        return Promise.all(
          data.characters.map((charUrl: string) =>
            fetchSingleCharacter(charUrl)
          )
        );
      })
      .then((charactersData) => {
        setCharacters(charactersData);
      })
      .finally(() => setLoading(false));
  }, [episodeId]);

  if (!episodeId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-4xl  relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="flex justify-between items-center w-full absolute top-2 right-2 text-whitemax-sm:p-4 py-4 px-8 cursor-pointer"
          >
            <h2 className="max-sm:text-sm text-xl font-bold">
              {episode?.name}
            </h2>
            <Icon
              icon="ep:close-bold"
              width="24"
              height="24"
              className=" hover:text-gray-400 "
            />
          </button>

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
            episode && (
              <div className=" text-white mt-12">
                {/* Episode Image */}
                <div className="group max-sm:hidden relative w-1/2 h-[200px] rounded-md overflow-hidden">
                  <img
                    src={profile}
                    alt="rick and morty episodes"
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Episode Details */}
                <div className="flex flex-col mt-4 gap-2">
                  <span className="text-sm">
                    <p className="text-gray-400">
                      Air Date: {episode.air_date}
                    </p>
                    <p className="text-gray-400">Episode: {episode.episode}</p>
                  </span>

                  {/* Characters List */}
                  <div className="text-gray-400">
                    <h3 className="text-lg font-semibold text-white mt-4">
                      Characters:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 overflow-y-scroll h-[300px]">
                      {characters.slice(0, 10).map((char, index) => (
                        <CharacterCard key={index} {...char} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EpisodeModal;
