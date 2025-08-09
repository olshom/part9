/*export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}*/

export interface ValidationError {
    error: ValidationErrorEntry[]
}

export interface ValidationErrorEntry {
    code: string;
    values: string[];
    path: string[]
    message: string;
}

export interface Entry {
    id: number
    weather: string,
    visibility: string,
    date: string,
    comment: string
}

export type NewEntry = Omit<Entry, 'id'>