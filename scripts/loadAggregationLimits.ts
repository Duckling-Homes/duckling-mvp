import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as Papa from 'papaparse'

function parseArgs() {
  if (process.argv.length < 4) {
    console.error(
      'Usage: ts-node loadAggregationLimits.ts <endpoint> <csvFilePath>'
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
        let impactedIncentiveIds = (row.impactedIncentiveIds || '')
          .split(/[;,]/)
          .map((id: string) => id.trim())
          .filter((id: string) => id !== '')
          .map((id: string) => ({ id }))

        const rowData = {
          id: row.id,
          limitName: row.limitName,
          limitDescription: row.limitDescription || null,
          limitWarning: row.limitWarning,
          limitAmount: parseFloat(row.limitAmount),
          impactedIncentives: {
            connect: impactedIncentiveIds,
          },
        }

        try {
          await prisma.aggregationLimit.upsert({
            where: { id: row.id },
            update: rowData,
            create: rowData,
          })
          console.log(`Upserted: ${JSON.stringify(rowData)}`)
        } catch (error) {
          console.error(`Error upserting ${JSON.stringify(rowData)}: `, error)
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
