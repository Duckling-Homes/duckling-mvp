// test/sample.test.ts

import * as uuid from 'uuid'
import { expect, test, vi } from 'vitest'
import { createProject, getProjects } from '../app/utils/repositories/project'
import prisma from '../lib/__mocks__/prisma'

vi.mock('../lib/prisma')

const MOCK_PROJECT = {
  name: 'Renovation Seattle',
  homeownerName: 'Rahul Patni',
  homeownerPhone: '123-231-1233',
  homeownerEmail: 'asdf@asdf.com',
  id: '1',
}

test('createUser should return the generated user', async () => {
  const id = uuid.v4()
  console.log('id', id)

  prisma.project.create.mockResolvedValue({ ...MOCK_PROJECT })

  const user = await createProject(MOCK_PROJECT)

  expect(prisma.project.create).toHaveBeenCalledOnce()

  expect(user).toStrictEqual({ ...MOCK_PROJECT, id: user.id })
})

test('getPosts should return an object with published & un-published posts separated', async () => {
  prisma.project.findMany.mockResolvedValue([
    MOCK_PROJECT,
    MOCK_PROJECT,
    MOCK_PROJECT,
  ])

  const projects = await getProjects()

  expect(prisma.project.findMany).toHaveBeenCalledOnce()

  expect(projects).toStrictEqual([MOCK_PROJECT, MOCK_PROJECT, MOCK_PROJECT])
})
