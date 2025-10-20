import { useState, useEffect, useCallback } from 'react';
import { apiService, Therapist, SearchParams, TherapistResponse } from '../services/api';

export interface UseTherapistsReturn {
  therapists: Therapist[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  } | null;
  searchTherapists: (params: SearchParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useTherapists = (initialParams: SearchParams = {}): UseTherapistsReturn => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseTherapistsReturn['pagination']>(null);
  const [currentParams, setCurrentParams] = useState<SearchParams>(initialParams);

  const fetchTherapists = useCallback(async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use search endpoint when a text query is present; otherwise list endpoint
      const response: TherapistResponse = params.q
        ? await apiService.searchTherapists(params)
        : await apiService.getTherapists(params);
      
      if (response.success) {
        setTherapists(response.data.therapists);
        setPagination(response.data.pagination);
        setCurrentParams(params);
      } else {
        throw new Error('Failed to fetch therapists');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching therapists:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchTherapists = useCallback(async (params: SearchParams) => {
    await fetchTherapists(params);
  }, [fetchTherapists]);

  const refetch = useCallback(async () => {
    await fetchTherapists(currentParams);
  }, [fetchTherapists, currentParams]);

  // Initial load
  useEffect(() => {
    fetchTherapists(initialParams);
  }, []);

  return {
    therapists,
    loading,
    error,
    pagination,
    searchTherapists,
    refetch,
  };
};
