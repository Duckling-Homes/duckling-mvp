import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as Papa from 'papaparse'

function parseArgs() {
  if (process.argv.length < 4) {
    console.error(
      'Usage: ts-node loadRebateOrganizations.ts <endpoint> <csvFilePath>'
    )
    process.exit(1)
  }
  return {
    endpoint: process.argv[2],
    csvFilePath: process.argv[3],
  }
}

const { endpoint, csvFilePath } = parseArgs()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: endpoint,
    },
  },
})

async function processCSV(filePath: string): Promise<void> {
  const csvFile = fs.readFileSync(filePath, 'utf8')

  Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      await prisma.$connect()
      console.log('Successfully connected to the database.')

      for (const row of results.data as any[]) {
        const { id, name } = row

        try {
          await prisma.rebateOrganization.create({
            data: {
              id,
              name,
            },
          })
          console.log(`Inserted Rebate Organization: ${id} - ${name}`)
        } catch (error) {
          console.error(`Error inserting ${id} - ${name}: `, error)
        }
      }

      await prisma.$disconnect()
      console.log('Disconnected from the database.')
    },
    error: (error: Error) => {
      console.error('Error parsing CSV: ', error)
    },
  })
}

async function runImport() {
  try {
    await processCSV(csvFilePath)
  } catch (error) {
    console.error('Failed to run the import:', error)
    process.exit(1)
  }
}

runImport()
