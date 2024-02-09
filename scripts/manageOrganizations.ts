import fs from 'fs'
import csv from 'csv-parser'
import { PrismaClient, Prisma } from '@prisma/client'

// Function to read CSV and print the details
const processCSV = async (filePath: string, prisma: PrismaClient) => {
  const rows: any[] = []

  // Read and collect rows
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row)
    })
    .on('end', async () => {
      console.log('CSV file reading completed. Processing data...')

      for (const row of rows) {
        if (!row.name || row.name.trim() === '') {
          console.error('Error: Missing orgName. Skipping row.')
          continue // Skip to the next iteration
        }

        const orgName = row.name
        const users = row.users ? row.users.split(',') : []
        const description = row.description ? row.description.trim() : undefined
        const webpage = row.webpage ? row.webpage.trim() : undefined

        try {
          let organization = await prisma.organization.findFirst({
            where: { name: orgName },
          })

          if (organization) {
            console.log(
              `Organization '${orgName}' already exists with ID: ${organization.id} - Updating values if applicable`
            )
            if (description && description != '') {
              await prisma.organization.update({
                where: { id: organization.id },
                data: { description },
              })
            }

            if (webpage && webpage != '') {
              await prisma.organization.update({
                where: { id: organization.id },
                data: { webpage },
              })
            }
          } else {
            // Create a new organization if we don't have an existing one
            organization = await prisma.organization.create({
              data: { name: orgName, description, webpage },
            })
            console.log(
              `Created new organization '${orgName}' with ID: ${organization.id}.`
            )
          }

          // Onboard users and associate them with the organization
          for (const email of users) {
            await prisma.user.upsert({
              where: {
                email,
              },
              create: {
                firstName: '',
                lastName: '',
                email: email,
                organization: {
                  connect: {
                    id: organization.id,
                  },
                },
              },
              update: {
                firstName: '',
                lastName: '',
              },
            })

            console.log(
              `User with email '${email}' has been created or updated and associated with organization '${orgName}'.`
            )
          }
        } catch (error) {
          console.error(`Failed to process row for orgName: ${orgName}`, error)
        }
      }

      console.log('CSV file successfully processed')
    })
}

const main = async (): Promise<void> => {
  const args: string[] = process.argv.slice(2)
  if (args.length < 2) {
    console.error('Incorrect number of arguments.')
    console.error(
      'Usage: ./scripts/manageOrganizations.ts <databaseEndpoint> <csvFilePath>'
    )
    console.error(
      "Example: ./scripts/onboardOrganization.ts 'postgresql://admin:admin@localhost:5432/db' 'path/to/my/csv_file'"
    )
    process.exit(1)
  }

  const [databaseEndpoint, csv_file] = args

  console.log(databaseEndpoint, csv_file)

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

  await processCSV(csv_file, prisma)
}

main().catch((error) => {
  console.error(`An error occurred: ${error}`)
  process.exit(1)
})
