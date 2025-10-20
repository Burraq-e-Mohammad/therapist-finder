import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { buildSearchQuery, buildWhereClause, buildOrderByClause, calculatePagination } from '../utils/queryHelpers';

const prisma = new PrismaClient();

export const searchTherapists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      q: query,
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

    // Build search query
    const searchWhere = buildSearchQuery(query as string);
    
    // Build filter query
    const filterWhere = buildWhereClause({
      cities: cities ? (Array.isArray(cities) ? cities as string[] : [cities as string]) : [],
      experienceRange: experienceRange as string || '',
      genders: genders ? (Array.isArray(genders) ? genders as string[] : [genders as string]) : [],
      feeRange: feeRange as string || '',
      consultationModes: consultationModes ? (Array.isArray(consultationModes) ? consultationModes as string[] : [consultationModes as string]) : [],
    });

    // Combine search and filter conditions
    const where = {
      AND: [
        searchWhere,
        filterWhere,
      ].filter(condition => Object.keys(condition).length > 0),
    };

    const orderBy = buildOrderByClause(sortBy as string, sortOrder as string);
    const { skip, take } = calculatePagination(Number(page), Number(limit));

    // Execute search
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
        query: query as string,
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
