// API service for communicating with the backend
const API_BASE_URL = 'https://therapist-finder.onrender.com/api/v1';

export interface Therapist {
  id: string;
  name: string;
  gender: string;
  city: string;
  experienceYears: number;
  fees: number | null;
  phone: string | null;
  email: string | null;
  modes: string[];
  education: string[];
  experience: string[];
  expertise: string[];
  about: string | null;
  profileUrl: string | null;
  feesRaw: string | null;
  feesCurrency: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TherapistResponse {
  success: boolean;
  data: {
    therapists: Therapist[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
    };
  };
}

export interface FilterOptions {
  cities?: string[];
  experienceRange?: string;
  genders?: string[];
  feeRange?: string;
  consultationModes?: string[];
}

export interface SearchParams extends FilterOptions {
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterResponse {
  success: boolean;
  data: {
    cities: Array<{ value: string; count: number }>;
    genders: Array<{ value: string; count: number }>;
    experienceRanges: any[];
    feeRanges: any[];
    consultationModes: Array<{ value: string; count: number }>;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all therapists with filtering and pagination
  async getTherapists(params: SearchParams = {}): Promise<TherapistResponse> {
    const searchParams = new URLSearchParams();
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/therapists${queryString ? `?${queryString}` : ''}`;
    
    return this.request<TherapistResponse>(endpoint);
  }

  // Get single therapist by ID
  async getTherapistById(id: string): Promise<{ success: boolean; data: Therapist }> {
    return this.request<{ success: boolean; data: Therapist }>(`/therapists/${id}`);
  }

  // Search therapists
  async searchTherapists(params: SearchParams = {}): Promise<TherapistResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/search${queryString ? `?${queryString}` : ''}`;
    
    return this.request<TherapistResponse>(endpoint);
  }

  // Get filter options
  async getFilterOptions(): Promise<FilterResponse> {
    return this.request<FilterResponse>('/filters');
  }

  // Get therapist statistics
  async getTherapistStats(): Promise<{ success: boolean; data: any }> {
    return this.request<{ success: boolean; data: any }>('/therapists/stats');
  }
}

export const apiService = new ApiService();
export default apiService;
