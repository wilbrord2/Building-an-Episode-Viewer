import { EpisodesResponse } from "../../types";

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
    return { info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null
    }, results:[] }; // ✅ Now the function always returns an array
  }
};
