const { PrismaClient } = require('@prisma/client')

// Function to throw an error if the database URL is not provided
const checkArguments = () => {
  const dbUrl = process.argv[2]
  if (!dbUrl) {
    throw new Error(
      'Database URL not provided. Usage: ts-node seedLocalOrganization.ts <database_url>'
    )
  }
  return dbUrl
}

const dbUrl = checkArguments()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
})

const run = async () => {
  const uuid = 'a4b5aa52-274d-4b1e-8f6b-3828f74c72d3'
  const name = 'GreenEarth Initiatives'

  // Check if organization already exists
  const existingOrganization = await prisma.organization.findUnique({
    where: {
      id: uuid,
    },
  })

  if (existingOrganization) {
    console.log('Organization already exists.')
    return
  }

  // Create a new organization if it doesn't exist
  const newOrganization = await prisma.organization.create({
    data: {
      id: uuid,
      name,
    },
  })

  console.log(`Organization created with ID: ${newOrganization.id}`)
}

run()
  .catch((e) => {
    console.error('Error occurred:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
