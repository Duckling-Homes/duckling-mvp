import { createServer } from "miragejs"

export default function () {
  createServer({
    routes() {
      this.get("/fakeapi/projects", () => ({
        projects: [
          {
            id: 1,
            projectName: '9303 Roslyndale Ave',
            name: 'George McFly',
            address: '9303 Roslyndale Ave, Arleta, CA',
            created: 'August 7, 2023',
          },
          {
            id: 2,
            projectName: '1809 Bushnell Ave',
            name: 'Biff Tannen',
            address: '1809 Bushnell Ave, South Pasadena, CA',
            created: 'August 5, 2023'
          },
          {
            id: 3,
            projectName: '1727 Bushenll Ave',
            name: 'Lorraine Baines',
            address: '1727 Bushnell Ave, South Pasadena, CA',
            created: 'August 4, 2023'
          },
        ],
      }))
    },
  })
}