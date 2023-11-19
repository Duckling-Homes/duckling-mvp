import {
  PrismaClient,
  RebateOrg,
  CalculationType,
  IncentiveType,
} from '@prisma/client'
import * as fs from 'fs'
import * as Papa from 'papaparse'

function parseArgs() {
  if (process.argv.length < 4) {
    console.error('Usage: ts-node loadIncentives.ts <endpoint> <csvFilePath>')
    process.exit(1)
  }
  return {
    endpoint: process.argv[2],
    csvFilePath: process.argv[3],
  }
}

const { endpoint, csvFilePath } = parseArgs()

const rebateOrgMapping: Record<string, RebateOrg> = {
  FederalGovernment: RebateOrg.FederalGovernment,
  BayREN: RebateOrg.BayREN,
  IRA: RebateOrg.IRA,
  NYSERDA: RebateOrg.NYSERDA,
}

const calculationTypeMapping: Record<string, CalculationType> = {
  Percentage: CalculationType.Percentage,
  PerUnit: CalculationType.PerUnit,
  FlatRate: CalculationType.FlatRate,
}

const incentiveTypeMapping: Record<string, IncentiveType> = {
  Rebate: IncentiveType.Rebate,
  TaxCredit: IncentiveType.TaxCredit,
}

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
        const rebateOrg = rebateOrgMapping[row.rebateOrg]
        const calculationType = calculationTypeMapping[row.calculationType]
        const type = incentiveTypeMapping[row.type]
        const calculationRateValue = parseFloat(row.calculationRateValue)
        const maxLimit = row.maxLimit ? parseFloat(row.maxLimit) : null

        const rowData = {
          id: row.id,
          name: row.name,
          rebateOrg,
          type,
          calculationType,
          calculationRateValue,
          maxLimit,
          descriptionText: row.descriptionText,
          criteria: row.criteria || null,
          notes: row.notes || null,
        }

        try {
          await prisma.incentive.upsert({
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
