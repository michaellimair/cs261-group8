export interface IRating {
  rating: number;
  rating_count: number;
}

export interface IRatingEntry {
  id: number;
  rating_value: number;
  description: string | null;
}

export interface IRatingEntryDTO extends Pick<IRatingEntry, 'rating_value' | 'description'> {}
