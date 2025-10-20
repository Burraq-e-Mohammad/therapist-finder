import { useState, useEffect } from 'react';
import { apiService, FilterResponse } from '../services/api';

export interface FilterOptions {
  cities: string[];
  experienceRange: string;
  genders: string[];
  feeRange: string;
  consultationModes: string[];
}

export interface UseFiltersReturn {
  filterOptions: FilterResponse['data'] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFilters = (): UseFiltersReturn => {
  const [filterOptions, setFilterOptions] = useState<FilterResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getFilterOptions();
      
      if (response.success) {
        setFilterOptions(response.data);
      } else {
        throw new Error('Failed to fetch filter options');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching filter options:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchFilterOptions();
  };

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  return {
    filterOptions,
    loading,
    error,
    refetch,
  };
};
