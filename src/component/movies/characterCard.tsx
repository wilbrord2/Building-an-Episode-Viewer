import { CharacterType } from "../../../types";

const CharacterCard: React.FC<CharacterType> = ({
  image,
  name,
  status,
  gender,
  species,
}) => {
  return (
    <div className="flex gap-4 items-center bg-gray-800 p-3 rounded-lg">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <p className="text-white font-bold">{name}</p>
        <p className="text-gray-400 text-sm">Status: {status}</p>
        <p className="text-gray-400 text-sm">Gender: {gender}</p>
        <p className="text-gray-400 text-sm">Species: {species}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
