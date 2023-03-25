export interface IReducer {
  type: string;
  payload?: any;
}

export interface Film {
  id: number;
  img: string;
  title: string;
  description?: string;
}
export interface CardFilm extends Film {
  newep?: number;
  status?: string;
  type?: string;
}

export interface TopFilm extends CardFilm {
  view: number;
}

export interface Trending extends TopFilm {
  totalep: number;
}
