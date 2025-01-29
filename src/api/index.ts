import { CharacterType, EpisodesResponse, EpisodeType } from "../../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchEpisodes = async (
  endpoint: string
): Promise<EpisodesResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }
};
export const fetchSingleEpisodes = async (
  endpoint: string
): Promise<EpisodeType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getEpisodes = async (
  endpoint: string
): Promise<EpisodeType> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      id:0 ,
    name: '',
    air_date: '',
    episode: '',
    characters:[],
    url: '',
    created: '',
    };
  }
};

export const fetchSingleCharacter = async (
  endpoint: string
): Promise<CharacterType> => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed to fetch character");

    return await response.json();
  } catch (error) {
    console.error("Error fetching character:", error);
    return {
      image: "",
      name: "Unknown",
      status: "Unknown",
      gender: "Unknown",
      species: "Unknown",
    };
  }
};

