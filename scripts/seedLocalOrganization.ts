const { PrismaClient } = require('@prisma/client')

export const seedPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://admin:admin@localhost:5447/postgres',
    },
  },
})

const run = async () => {
  const uuid = 'a4b5aa52-274d-4b1e-8f6b-3828f74c72d3'
  const name = 'GreenEarth Initiatives'

  // Check if organization already exists
  const existingOrganization = await seedPrisma.organization.findUnique({
    where: {
      id: uuid,
    },
  })

  if (existingOrganization) {
    console.log('Organization already exists.')
    return
  }

  // Create a new organization if it doesn't exist
  const newOrganization = await seedPrisma.organization.create({
    data: {
      id: uuid,
      name,
    },
  })

  console.log(`Organization created with ID: ${newOrganization.id}`)
}

run()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await seedPrisma.$disconnect()
  })
