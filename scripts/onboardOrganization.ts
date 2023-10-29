#!/usr/bin/env -S ts-node -P ./scripts/tsconfig.json
import { createUser } from '../app/utils/repositories/user'
import { PrismaClient, Prisma } from '@prisma/client'

/**
 * Main function to onboard organization and users.
 */
const main = async (): Promise<void> => {
  // Command-line argument processing
  const args: string[] = process.argv.slice(2)

  // Validate the number of arguments
  if (args.length < 3) {
    console.error('Incorrect number of arguments.')
    console.error(
      'Usage: ./scripts/onboardOrganization.ts <databaseEndpoint> <orgName> <email1,email2,...>'
    )
    console.error(
      "Example: ./scripts/onboardOrganization.ts 'postgresql://admin:admin@localhost:5432/db' 'NewOrg' 'user1@example.com,user2@example.com'"
    )
    process.exit(1)
  }

  const [databaseEndpoint, orgName, emailList] = args
  const emails = emailList.split(',')

  // Initialize Prisma client
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseEndpoint,
      },
    },
  })

  // Connect to the database
  await prisma.$connect()
  console.log('Successfully connected to the database.')

  // Check for existing organization
  let existingOrg = await prisma.organization.findFirst({
    where: { name: orgName },
  })

  if (existingOrg) {
    console.log(
      `Organization '${orgName}' already exists with ID: ${existingOrg.id}.`
    )
  } else {
    // Create a new organization if we don't have an existing one
    existingOrg = await prisma.organization.create({
      data: { name: orgName },
    })
    console.log(
      `Created new organization '${orgName}' with ID: ${existingOrg.id}.`
    )
  }

  // Onboard users and associate them with the organization
  for (const email of emails) {
    const newUser: Prisma.UserUncheckedCreateInput = {
      email,
      organizationId: existingOrg.id,
      firstName: '',
      lastName: '',
    }

    await createUser(newUser)
    console.log(
      `User with email '${email}' has been created and associated with organization '${orgName}'.`
    )
  }

  // Close database connection
  await prisma.$disconnect()
  console.log('Disconnected from the database.')
}

// Invoke main function and handle exceptions
main().catch((error) => {
  console.error(`An error occurred: ${error}`)
  process.exit(1)
})
