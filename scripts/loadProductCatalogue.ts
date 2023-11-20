import {
  PrismaClient,
  Category,
  CatalogEntryType,
  PricingType,
} from '@prisma/client'
import * as fs from 'fs'
import * as Papa from 'papaparse'

function parseArgs() {
  if (process.argv.length < 5) {
    console.error(
      'Usage: ts-node loadProductCatalogue.ts <endpoint> <csvFilePath> <orgContext>'
    )
    process.exit(1)
  }
  return {
    endpoint: process.argv[2],
    csvFilePath: process.argv[3],
    orgContext: process.argv[4],
  }
}

const { endpoint, csvFilePath, orgContext } = parseArgs()

// Mapping of CSV string values to the Prisma enum types
const categoryMapping: Record<string, Category> = {
  HomePerformance: Category.HomePerformance,
  HVAC: Category.HVAC,
  Appliances: Category.Appliances,
  Electrical: Category.Electrical,
}

const entryTypeMapping: Record<string, CatalogEntryType> = {
  Equipment: CatalogEntryType.Equipment,
  Other: CatalogEntryType.Other,
  Service: CatalogEntryType.Service,
}

const pricingTypeMapping: Record<string, PricingType> = {
  PerUnit: PricingType.PerUnit,
  ScaledPricing: PricingType.ScaledPricing,
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: endpoint,
    },
  },
})

async function processCSV(filePath: string, orgContext: string): Promise<void> {
  const csvFile = fs.readFileSync(filePath, 'utf8')

  Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      await prisma.$connect()
      console.log('Successfully connected to the database.')

      for (const row of results.data as any[]) {
        const category = categoryMapping[row.category]
        const type = entryTypeMapping[row.type]
        const pricingType = pricingTypeMapping[row.pricingType]
        const basePricePer = parseFloat(row.basePricePer)

        const incentiveIds = row.incentiveIds
          .split(';')
          .map((id: string) => ({ id }))

        const rowData = {
          id: row.id,
          category,
          subcategory: row.subcategory || null,
          name: row.name,
          description: row.description || null,
          type,
          pricingType,
          scaledPricingMetric: row.scaledPricingMetric || null,
          basePricePer,
          brand: row.brand || null,
          modelNumber: row.modelNumber || null,
          ahriNumber: row.ahriNumber || null,
          organizationId: orgContext,
          incentives: {
            connect: incentiveIds,
          },
        }

        try {
          await prisma.productCatalogue.upsert({
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
    await processCSV(csvFilePath, orgContext)
  } catch (error) {
    console.error('Failed to run the import:', error)
    process.exit(1)
  }
}

runImport()
