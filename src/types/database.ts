export interface Team {
  id: string;
  name: string;
  leader_1: string;
  leader_2: string;
  is_default: boolean;
  logo_url?: string;
  created_at: string;
  total_points?: number;
}

export interface Candidate {
  id: string;
  name: string;
  team_id: string;
  photo_url?: string;
  category?: string;
  created_at: string;
  team?: Team;
}

export interface Event {
  id: string;
  name: string;
  category: string;
  max_points: number;
  created_at: string;
}

export interface Result {
  id: string;
  event_id: string;
  candidate_id: string;
  position: number;
  points: number;
  created_at: string;
  event?: Event;
  candidate?: Candidate;
}
