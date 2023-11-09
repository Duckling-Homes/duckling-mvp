import {
  PrismaClient,
  Category,
  CatalogEntryType,
  PricingType,
} from '@prisma/client'
import * as fs from 'fs'
import * as Papa from 'papaparse'

/**
 * Parses command line arguments to retrieve the database endpoint, CSV file path, and organization context.
 * Expects exactly four arguments: script call, database endpoint, CSV file path, organization ID.
 * Exits with an error if the required arguments are not provided.
 * @returns An object containing the endpoint, CSV file path, and organization context.
 */
function parseArgs() {
  if (process.argv.length < 5) {
    console.error(
      'Usage: ts-node import-csv.ts <endpoint> <csvFilePath> <orgContext>'
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
  'Home Performance': Category.HomePerformance,
  HVAC: Category.HVAC,
  Appliances: Category.Appliances,
  Electrical: Category.Electrical,
}

const entryTypeMapping: Record<string, CatalogEntryType> = {
  Equipment: CatalogEntryType.Equipment,
  Service: CatalogEntryType.Service,
  Other: CatalogEntryType.Other,
}

const pricingTypeMapping: Record<string, PricingType> = {
  PerUnit: PricingType.PerUnit,
  ScaledPricing: PricingType.ScaledPricing,
}

// Initialize Prisma client with the provided database endpoint
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: endpoint,
    },
  },
})

/**
 * Reads the CSV file and processes each row to create a product catalogue entry in the database.
 * Maps string values from the CSV to the corresponding Prisma enum types and converts the base price to a float.
 * Adds the provided organization context to each entry.
 * @param filePath - Path to the CSV file that contains the product catalogue data.
 * @param orgContext - The organization ID to associate with each product catalogue entry.
 */
async function processCSV(filePath: string, orgContext: string): Promise<void> {
  const csvFile = fs.readFileSync(filePath, 'utf8')

  Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      // Establish a database connection
      await prisma.$connect()
      console.log('Successfully connected to the database.')

      for (const row of results.data as any[]) {
        // Map CSV string values to the corresponding Prisma enum types
        const category = categoryMapping[row.category]
        const type = entryTypeMapping[row.type]
        const pricingType = pricingTypeMapping[row.pricingType]
        // Convert the base price to a float for Prisma
        const basePricePer = parseFloat(row.basePricePer)

        // Construct the data object for Prisma, including the organization ID
        const rowData = {
          ...row,
          category,
          type,
          pricingType,
          basePricePer,
          organizationId: orgContext,
        }

        // Insert the data into the database
        try {
          await prisma.productCatalogue.create({
            data: rowData,
          })
          console.log(`Inserted: ${JSON.stringify(rowData)}`)
        } catch (error) {
          console.error(`Error inserting ${JSON.stringify(rowData)}: `, error)
        }
      }

      // Close the database connection
      await prisma.$disconnect()
      console.log('Disconnected from the database.')
    },
    error: (error: Error) => {
      console.error('Error parsing CSV: ', error)
    },
  })
}

/**
 * Initiates the CSV import process.
 * Calls `processCSV` with the provided CSV file path and organization context.
 */
async function runImport() {
  try {
    await processCSV(csvFilePath, orgContext)
  } catch (error) {
    console.error('Failed to run the import:', error)
    process.exit(1)
  }
}

runImport()

/**
 * CSV Format Expectation:
 * The CSV file should have headers matching the column names of the `ProductCatalogue` model in Prisma.
 * Example CSV headers:
 * category,subcategory,name,description,type,pricingType,scaledPricingMetric,basePricePer,brand,modelNumber,ahriNumber
 *
 * Usage:
 * Run this script with ts-node, providing the database endpoint, path to the CSV file, and organization ID as arguments.
 * Example command:
 * ts-node import-csv.ts "postgresql://localhost/mydb" "./path/to/catalogue.csv" "org-123"
 */
