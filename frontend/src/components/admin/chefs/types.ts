
export interface ChefProfile {
  id: string;
  name: string;
  bio: string | null;
  contact_email: string | null;
  profile_image_url: string | null;
  specialties: string[] | null;
  rating: number | null;
  total_recipes: number | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    role: string;
  } | null;
}
