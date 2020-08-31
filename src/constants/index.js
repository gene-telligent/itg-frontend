import { QUERY_FIELDS } from './enums';


export const API_URL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3001/' : 'https://api.fitupyourstyle.com/';

export const HEAD_CELLS = [
  { id: 'artist', disablePadding: true, label: 'Artist Name' },
  { id: 'name', disablePadding: true, label: 'Track Name' },
  { id: 'bpm', disablePadding: true, label: 'BPM' },
  { id: ['pack', 'name'], disablePadding: true, label: 'Pack Name' },
  { id: 'difficultyMap', disablePadding: true, label: 'Difficulties' },
];

export const DEFAULT_QUERY_FILTER = {
  field: QUERY_FIELDS.artist,
  value: ''
};
