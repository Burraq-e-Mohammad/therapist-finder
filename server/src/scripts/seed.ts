import { PrismaClient } from '@prisma/client';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { processTherapistData, RawTherapistData } from '../utils/dataProcessing';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await prisma.therapist.deleteMany();
    console.log('🗑️  Cleared existing therapist data');

    // Read and process CSV data
    const csvPath = path.join(__dirname, '../../data/pakmh_profiles - pakmh_profiles.csv');
    const therapists: any[] = [];

    console.log('📄 Reading CSV file...');

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          try {
            const processedData = processTherapistData(row as RawTherapistData);
            therapists.push(processedData);
          } catch (error) {
            console.warn('⚠️  Skipping invalid row:', error);
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`📊 Processed ${therapists.length} therapist records`);

    // Insert data in batches
    const batchSize = 100;
    for (let i = 0; i < therapists.length; i += batchSize) {
      const batch = therapists.slice(i, i + batchSize);
      await prisma.therapist.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(therapists.length / batchSize)}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📈 Total therapists imported: ${therapists.length}`);

    // Display some statistics
    const stats = await prisma.therapist.aggregate({
      _count: true,
      _avg: {
        experienceYears: true,
        fees: true,
      },
    });

    console.log('\n📊 Database Statistics:');
    console.log(`Total therapists: ${stats._count}`);
    console.log(`Average experience: ${stats._avg.experienceYears?.toFixed(1)} years`);
    console.log(`Average fee: Rs. ${stats._avg.fees?.toFixed(0)}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
