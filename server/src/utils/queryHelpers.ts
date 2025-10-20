import { Prisma } from '@prisma/client';

export interface FilterOptions {
  cities?: string[] | undefined;
  experienceRange?: string | undefined;
  genders?: string[] | undefined;
  feeRange?: string | undefined;
  consultationModes?: string[] | undefined;
}

export interface SearchOptions {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'experienceYears' | 'fees';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Build Prisma where clause based on filters
 */
export function buildWhereClause(filters: FilterOptions): Prisma.TherapistWhereInput {
  const where: Prisma.TherapistWhereInput = {};

  // Defensive normalization to prevent Prisma validation errors
  const normalizedCities = Array.isArray(filters.cities)
    ? (filters.cities.filter(Boolean).map(v => String(v)) as string[])
    : undefined;
  const normalizedGenders = Array.isArray(filters.genders)
    ? (filters.genders.filter(Boolean).map(v => String(v)) as string[])
    : undefined;
  const normalizedModes = Array.isArray(filters.consultationModes)
    ? (filters.consultationModes.filter(Boolean).map(v => String(v)) as string[])
    : undefined;

  // City filter
  if (normalizedCities && normalizedCities.length > 0) {
    where.city = {
      in: normalizedCities,
    };
  }

  // Gender filter
  if (normalizedGenders && normalizedGenders.length > 0) {
    where.gender = {
      in: normalizedGenders,
    };
  }

  // Experience range filter
  if (filters.experienceRange) {
    const experienceRange = filters.experienceRange;
    switch (experienceRange) {
      case '0-5 years':
        where.experienceYears = {
          gte: 0,
          lt: 5,
        };
        break;
      case '5-10 years':
        where.experienceYears = {
          gte: 5,
          lt: 10,
        };
        break;
      case '10-15 years':
        where.experienceYears = {
          gte: 10,
          lt: 15,
        };
        break;
      case '15+ years':
        where.experienceYears = {
          gte: 15,
        };
        break;
    }
  }

  // Fee range filter
  if (filters.feeRange) {
    const feeRange = filters.feeRange;
    switch (feeRange) {
      case 'Under Rs.2000':
        where.fees = {
          lt: 2000,
        };
        break;
      case 'Rs.2000-4000':
        where.fees = {
          gte: 2000,
          lt: 4000,
        };
        break;
      case 'Rs.4000-6000':
        where.fees = {
          gte: 4000,
          lt: 6000,
        };
        break;
      case 'Above Rs.6000':
        where.fees = {
          gte: 6000,
        };
        break;
    }
  }

  // Consultation mode filter
  if (normalizedModes && normalizedModes.length > 0) {
    where.modes = {
      hasSome: normalizedModes,
    };
  }

  return where;
}

/**
 * Build search query for text search
 */
export function buildSearchQuery(query?: string): Prisma.TherapistWhereInput {
  if (typeof query !== 'string') {
    return {};
  }
  const searchTerm = query.trim();
  
  if (!searchTerm) {
    return {};
  }

  return {
    OR: [
      {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      {
        expertise: {
          hasSome: [searchTerm],
        },
      },
      {
        education: {
          hasSome: [searchTerm],
        },
      },
      {
        about: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
    ],
  };
}

/**
 * Build order by clause for sorting
 */
export function buildOrderByClause(
  sortBy: string = 'name',
  sortOrder: string = 'asc'
): Prisma.TherapistOrderByWithRelationInput {
  const order = sortOrder === 'desc' ? 'desc' : 'asc';
  
  switch (sortBy) {
    case 'experienceYears':
      return { experienceYears: order };
    case 'fees':
      // Handle null fees properly - put nulls at the end for both asc and desc
      return order === 'desc' 
        ? { fees: { sort: 'desc', nulls: 'last' } }
        : { fees: { sort: 'asc', nulls: 'last' } };
    case 'name':
    default:
      return { name: order };
  }
}

/**
 * Calculate pagination parameters
 */
export function calculatePagination(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  return { skip, take: limit };
}
