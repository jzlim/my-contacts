export type Episode = {
  id: number;
  name: string;
  air_date: string; // match same naming convention as API provided
  episode: string;
  characters: [string];
  url: string;
  created: string;
};
