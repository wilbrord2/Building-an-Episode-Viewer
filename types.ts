export type InfoType = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type EpisodeType = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type EpisodesResponse = {
  info: InfoType;
  results: EpisodeType[];
};

export type CharacterType = {
  image: string;
  name: string;
  status: string;
  gender: string;
  species: string;
};