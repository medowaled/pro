import { seedStaticCourses } from '../src/lib/db-seeder';

async function main() {
  try {
    console.log('Starting static courses seeding...');
    await seedStaticCourses();
    console.log('Static courses seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding static courses:', error);
    process.exit(1);
  }
}

main(); 