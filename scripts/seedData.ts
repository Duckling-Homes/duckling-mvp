import { seedPrisma } from './seedLocalOrganization'

type OrgData = {
  id: string
  name: string
}

type UserData = {
  id: string
  email: string
  firstName: string
  lastName: string
  organizationId: string
}

const orgData: OrgData[] = [
  {
    id: 'a4b5aa52-274d-4b1e-8f6b-3828f74c72d3',
    name: 'GreenEarth Initiatives',
  },
  {
    id: '506fe560-8627-4fab-8d73-70f45fcb7752',
    name: 'Duckling Rescue',
  },
]

const userData: UserData[] = [
  {
    id: '08a259d5-e1f4-4181-b405-e922cab8ec42',
    email: 'therahulpatni+1@gmail.com',
    firstName: 'Rahul',
    lastName: 'Patni',
    organizationId: '506fe560-8627-4fab-8d73-70f45fcb7752',
  },
]

const loadOrganizations = async () => {}

const seedData = async () => {
  seedPrisma.user
}

seedData()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await seedPrisma.$disconnect()
  })
