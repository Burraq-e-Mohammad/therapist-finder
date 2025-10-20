import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFilterOptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [cities, genders, experienceRanges, feeRanges, consultationModes] = await Promise.all([
      // City options with counts
      prisma.therapist.groupBy({
        by: ['city'],
        _count: { _all: true },
        orderBy: { city: 'asc' },
      }),
      
      // Gender options with counts
      prisma.therapist.groupBy({
        by: ['gender'],
        _count: { _all: true },
        orderBy: { gender: 'asc' },
      }),
      
      // Experience ranges (calculated)
      prisma.$queryRaw`
        SELECT 
          CASE 
            WHEN experience_years < 5 THEN '0-5 years'
            WHEN experience_years < 10 THEN '5-10 years'
            WHEN experience_years < 15 THEN '10-15 years'
            ELSE '15+ years'
          END as range,
          COUNT(*) as count
        FROM therapists 
        GROUP BY range
        ORDER BY range
      `,
      
      // Fee ranges (calculated)
      prisma.$queryRaw`
        SELECT 
          CASE 
            WHEN fees < 2000 THEN 'Under Rs.2000'
            WHEN fees < 4000 THEN 'Rs.2000-4000'
            WHEN fees < 6000 THEN 'Rs.4000-6000'
            ELSE 'Above Rs.6000'
          END as range,
          COUNT(*) as count
        FROM therapists 
        WHERE fees IS NOT NULL
        GROUP BY range
        ORDER BY range
      `,
      
      // Consultation modes (fetch all and aggregate in code; distinct on list fields is unsupported)
      prisma.therapist.findMany({
        select: { modes: true },
      }),
    ]);

    // Process consultation modes
    const modeCounts: Record<string, number> = {};
    consultationModes.forEach(therapist => {
      const therapistModes = therapist.modes || [];
      therapistModes.forEach(mode => {
        if (!mode) return;
        modeCounts[mode] = (modeCounts[mode] || 0) + 1;
      });
    });

    res.json({
      success: true,
      data: {
        cities: cities.map(city => ({
          value: city.city,
          count: Number((city as any)._count?._all ?? 0),
        })),
        genders: genders.map(gender => ({
          value: gender.gender,
          count: Number((gender as any)._count?._all ?? 0),
        })),
        experienceRanges: (experienceRanges as any[]).map(row => ({
          range: row.range as string,
          count: Number(row.count),
        })),
        feeRanges: (feeRanges as any[]).map(row => ({
          range: row.range as string,
          count: Number(row.count),
        })),
        consultationModes: Object.entries(modeCounts).map(([mode, count]) => ({
          value: mode,
          count: Number(count),
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
