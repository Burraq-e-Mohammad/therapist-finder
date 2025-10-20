import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { buildWhereClause, buildOrderByClause, calculatePagination } from '../utils/queryHelpers';
import { FilterOptions, SearchOptions } from '../utils/queryHelpers';

const prisma = new PrismaClient();

/**
 * Get all therapists with optional filtering and pagination
 */
export const getTherapists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      cities,
      experienceRange,
      genders,
      feeRange,
      consultationModes,
    } = req.query;

    // Parse filters
    const filters: FilterOptions = {
      cities: cities ? (Array.isArray(cities) ? cities as string[] : [cities as string]) : [],
      experienceRange: experienceRange as string || '',
      genders: genders ? (Array.isArray(genders) ? genders as string[] : [genders as string]) : [],
      feeRange: feeRange as string || '',
      consultationModes: consultationModes ? (Array.isArray(consultationModes) ? consultationModes as string[] : [consultationModes as string]) : [],
    };

    // Build query parameters
    const where = buildWhereClause(filters);
    const orderBy = buildOrderByClause(sortBy as string, sortOrder as string);
    const { skip, take } = calculatePagination(Number(page), Number(limit));

    // Execute queries in parallel
    const [therapists, totalCount] = await Promise.all([
      prisma.therapist.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      prisma.therapist.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / Number(limit));
    const hasNextPage = Number(page) < totalPages;
    const hasPrevPage = Number(page) > 1;

    res.json({
      success: true,
      data: {
        therapists,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit: Number(limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single therapist by ID
 */
export const getTherapistById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Therapist ID is required',
        },
      });
    }

    const therapist = await prisma.therapist.findUnique({
      where: { id },
    });

    if (!therapist) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Therapist not found',
        },
      });
    }

    return res.json({
      success: true,
      data: therapist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get therapist statistics
 */
export const getTherapistStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      totalTherapists,
      cityStats,
      genderStats,
      experienceStats,
      feeStats,
    ] = await Promise.all([
      prisma.therapist.count(),
      
      // City statistics
      prisma.therapist.groupBy({
        by: ['city'],
        _count: true,
        orderBy: { _count: { city: 'desc' } },
      }),
      
      // Gender statistics
      prisma.therapist.groupBy({
        by: ['gender'],
        _count: true,
      }),
      
      // Experience statistics
      prisma.therapist.aggregate({
        _avg: { experienceYears: true },
        _min: { experienceYears: true },
        _max: { experienceYears: true },
      }),
      
      // Fee statistics
      prisma.therapist.aggregate({
        where: { fees: { not: null } },
        _avg: { fees: true },
        _min: { fees: true },
        _max: { fees: true },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalTherapists,
        cityStats: cityStats.map(stat => ({
          city: stat.city,
          count: stat._count,
        })),
        genderStats: genderStats.map(stat => ({
          gender: stat.gender,
          count: stat._count,
        })),
        experienceStats: {
          average: experienceStats._avg.experienceYears,
          min: experienceStats._min.experienceYears,
          max: experienceStats._max.experienceYears,
        },
        feeStats: {
          average: feeStats._avg.fees,
          min: feeStats._min.fees,
          max: feeStats._max.fees,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
