import {
  CatalogueItem,
  Copy,
  FinancingOption,
  Organization,
  PhotoDetails,
  Plan,
  PlanDetails,
  PresentationDetails,
  ProductCatalogue,
  Project,
  ProjectAppliance,
  ProjectData,
  ProjectElectrical,
  ProjectEnvelope,
  ProjectRoom,
} from '@/types/types'
import { makeAutoObservable, observable, runInAction } from 'mobx'
import { SyncAPI } from '../sync'
import { _Object } from '../sync/db'

/**
 * ModelStore is the reactive layer on top of our SyncAPI which treats local storage
 * as source of truth.
 * ***NO FETCH CALLS ARE ALLOWED FROM FRONT-END CODE.*** Any fetching is to happen in Sync layer.
 *
 * ModelStore simply wraps SyncAPI to do CRUD and update MobX
 * properties so that UI components can get automatic updates on the changes.
 */
export class _ModelStore {
  isInitialized = false

  projectsByID: Map<string, Project> = observable.map(new Map())
  currentProject: Project | null = null
  currentPresentation: PresentationDetails | null = null
  organization: Organization | null = null
  hasPendingChanges = false
  onlineStatus: 'online' | 'offline' = 'online'
  plans: Plan[] = []
  productCatalogue: ProductCatalogue[] = []
  financingOptions: FinancingOption[] = []
  catalogueItems: CatalogueItem[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get projects() {
    return Array.from(this.projectsByID.values())
  }

  init = async () => {
    if (this.isInitialized) return

    this.isInitialized = true
    SyncAPI.setBackgroundSync(true, 5 * 60 * 1000)

    SyncAPI.events.on('has-pending-changes', (status: boolean) => {
      runInAction(() => (this.hasPendingChanges = status))
    })

    SyncAPI.events.on('did-go-online', (_) => {
      runInAction(() => {
        this.onlineStatus = 'online'
      })
    })

    SyncAPI.events.on('did-go-offline', (_) => {
      runInAction(() => {
        this.onlineStatus = 'offline'
      })
    })

    // Any time a Project is updated by the SyncAPI, this hook will trigger to update MobX
    SyncAPI.events.on(
      'did-modify-dbobject',
      (objectID: string, value: _Object | null) => {
        const object = value?.json
        const objectType = value?.type

        runInAction(() => {
          if (objectType === 'Project') {
            this._updateMobxProject(object as Project)
          } else if (!object) {
            this.projectsByID.delete(objectID)
          }
        })
      }
    )

    await SyncAPI.sync()
    const projects = await SyncAPI.projects.list()
    for (const proj of projects) {
      if (!this.projectsByID.has(proj.id!)) {
        this.projectsByID.set(proj.id!, proj)
      }
    }
  }

  setCurrentProject = async (projectId: string) => {
    const project = await this.reloadProject(projectId)
    this.currentProject = project
    if (project.plans && this.plans.length === 0) {
      this.plans = project.plans
    }
    return project
  }

  clearCurrentProject() {
    this.currentProject = null
  }

  setCurrentPresentation = async (orgID: string, projectId: string) => {
    const presentationData = await ModelStore.unauthedGetPresentationData(
      orgID,
      projectId
    )
    this.currentPresentation = presentationData
    return presentationData
  }

  clearCurrentPresentation() {
    this.currentPresentation = null
  }

  /**
   * This function retrieves the latest view of the project from the SyncAPI for the specified projectID and should be
   * called on every model store mutation to make keep the ModelStore and SyncAPI views in lockstep.
   */
  reloadProject = async (projectID: string) => {
    console.log('loading')
    this.init()
    const project = await SyncAPI.projects.get(projectID)
    this.plans = project.plans || []
    this._updateMobxProject(project)
    return project
  }

  private _updateMobxProject = async (project: Project) => {
    if (this.currentProject?.id === project.id) {
      this.currentProject = project
    }
    this.projectsByID.set(project.id!, project)
  }

  createProject = async (newProject: Project) => {
    const created = await SyncAPI.projects.create(newProject)
    this.projectsByID.set(created.id!, created)
    return created
  }

  deleteProject = async (projectId: string) => {
    await SyncAPI.projects.delete(projectId)
    this.projectsByID.delete(projectId)
  }

  patchProject = async (project: Project) => {
    const updated = await SyncAPI.projects.update(project)
    if (this.currentProject?.id === project.id) {
      this.currentProject = updated
    }
    this.projectsByID.set(updated.id!, updated)
    return updated
  }

  patchProjectData = async (projectId: string, projectData: ProjectData) => {
    const data = await SyncAPI.projects.updateProjectData(
      projectId,
      projectData
    )
    this.reloadProject(projectId)
    return data
  }

  fetchOrganization = async (organizationId: string) => {
    this.organization = await SyncAPI.organizations.get(organizationId)
    this.fetchCatalogue()
    this.fetchFinancingOptions()
    return this.organization
  }

  fetchCatalogue = async () => {
    this.productCatalogue = await SyncAPI.organizations.getCatalogue()
    return this.productCatalogue
  }

  fetchFinancingOptions = async () => {
    this.financingOptions = await SyncAPI.organizations.getFinancingOptions()
    return this.financingOptions
  }

  createAppliance = async (
    projectID: string,
    applianceType: string,
    appliance: ProjectAppliance
  ) => {
    const created = await SyncAPI.appliances.create(
      projectID,
      applianceType,
      appliance
    )
    await this.reloadProject(projectID)
    return created
  }

  updateAppliance = async (
    projectID: string,
    applianceType: string,
    appliance: ProjectAppliance
  ) => {
    const updated = await SyncAPI.appliances.update(
      projectID,
      applianceType,
      appliance
    )
    await this.reloadProject(projectID)
    return updated
  }

  deleteAppliance = async (
    projectID: string,
    applianceType: string,
    applianceId: string
  ) => {
    await SyncAPI.appliances.delete(projectID, applianceType, applianceId)
    await this.reloadProject(projectID)
  }

  createRoom = async (projectID: string, room: ProjectRoom) => {
    const created = await SyncAPI.rooms.create(projectID, room)
    await this.reloadProject(projectID)
    return created
  }

  updateRoom = async (projectID: string, room: ProjectRoom) => {
    const updated = await SyncAPI.rooms.update(projectID, room)
    await this.reloadProject(projectID)
    return updated
  }

  deleteRoom = async (projectID: string, roomID: string) => {
    await SyncAPI.rooms.delete(projectID, roomID)
    await this.reloadProject(projectID)
  }

  createEnvelope = async (projectID: string, envelope: ProjectEnvelope) => {
    const created = await SyncAPI.envelopes.create(projectID, envelope)
    await this.reloadProject(projectID)
    return created
  }

  updateEnvelope = async (projectID: string, envelope: ProjectEnvelope) => {
    const updated = await SyncAPI.envelopes.update(projectID, envelope)
    await this.reloadProject(projectID)
    return updated
  }

  deleteEnvelope = async (
    projectID: string,
    envelopeType: string,
    envelopeID: string
  ) => {
    await SyncAPI.envelopes.delete(projectID, envelopeType, envelopeID)
    await this.reloadProject(projectID)
  }

  createElectrical = async (
    projectID: string,
    electrical: ProjectElectrical
  ) => {
    const created = await SyncAPI.electrical.create(projectID, electrical)
    await this.reloadProject(projectID)
    return created
  }

  updateElectrical = async (
    projectID: string,
    electrical: ProjectElectrical
  ) => {
    const updated = await SyncAPI.electrical.update(projectID, electrical)
    await this.reloadProject(projectID)
    return updated
  }

  deleteElectrical = async (
    projectID: string,
    electricalType: string,
    electricalID: string
  ) => {
    await SyncAPI.electrical.delete(projectID, electricalType, electricalID)
    await this.reloadProject(projectID)
  }

  createPhotoEntry = async (
    projectID: string,
    imgDataUrl: string,
    photoDetails: PhotoDetails
  ) => {
    const created = await SyncAPI.images.create(
      projectID,
      imgDataUrl,
      photoDetails
    )
    await this.reloadProject(projectID)
    return created
  }

  downloadPhoto = async (imageID: string) => {
    return await SyncAPI.images.download(imageID)
  }

  patchPhotoUrl = async (
    projectID: string,
    imageId: string,
    newImageUrl: string
  ) => {
    const updated = await SyncAPI.images.upload(imageId, newImageUrl)
    await this.reloadProject(projectID)
    return updated
  }

  patchPhotoDetails = async (projectID: string, photoDetails: PhotoDetails) => {
    const updated = await SyncAPI.images.update(projectID, photoDetails)
    await this.reloadProject(projectID)
    return updated
  }

  deletePhoto = async (projectID: string, imageID: string) => {
    await SyncAPI.images.delete(projectID, imageID)
    await this.reloadProject(projectID)
  }

  createPlan = async (projectID: string, plan: Plan) => {
    const created = await SyncAPI.plans.create(projectID, plan)
    await this.reloadProject(projectID)
    return created
  }

  patchPlan = async (projectID: string, plan: Plan) => {
    const updated = await SyncAPI.plans.update(projectID, plan)
    await this.reloadProject(projectID)
    return updated
  }

  deletePlan = async (projectID: string, planID: string) => {
    await SyncAPI.plans.delete(projectID, planID)
    await this.reloadProject(projectID)
  }

  addPlanItem = async (planId: string, item: CatalogueItem) => {
    const plans = this.plans
    const currentPlan = plans.find((plan) => plan.id === planId)
    const catalogueItems = this.catalogueItems

    if (!currentPlan) {
      console.error('There is no plan with this ID')
      return
    }

    catalogueItems.push(item)

    plans.forEach((plan, index) => {
      if (plan.id === planId) {
        plans[index] = {
          ...currentPlan,
          catalogueItems: catalogueItems,
        }
      }
    })

    for (const plan of plans) {
      await this.patchPlan(this.currentProject?.id as string, plan)
    }
  }

  removePlanItem = async (
    planId: string,
    itemCustomId: string,
  ) => {
    const plans = this.plans
    const currentPlan = plans.find((plan) => plan.id === planId)
    const catalogueItems = this.catalogueItems

    if (!currentPlan) {
      console.error('There is no plan with this ID')
      return
    }
    catalogueItems.forEach((item: CatalogueItem, index) => {
      if (item.customId === itemCustomId) {
        catalogueItems.splice(index, 1)
      }
    })

    plans.forEach((plan, index) => {
      if (plan.id === planId) {
        plans[index] = {
          ...currentPlan,
          catalogueItems: catalogueItems,
        }
      }
    })
    
    for (const plan of plans) {
      await this.patchPlan(this.currentProject?.id as string, plan)
    }
  }

  updatePlanItem = async (
    planId: string,
    newItem: CatalogueItem,
  ) => {
    const plans = this.plans
    const currentPlan = plans.find((plan) => plan.id === planId) as Plan
    const catalogueItems = this.catalogueItems as CatalogueItem[]

    if (!currentPlan) {
      console.error('There is no plan with this ID')
      return
    }

    const updatedCatalogueItems = catalogueItems.map((item: CatalogueItem) =>
      item.customId === newItem.customId ? newItem : item
    )

    plans.forEach((plan, index) => {
      if (plan.id === planId) {
        plans[index] = {
          ...currentPlan,
          catalogueItems: updatedCatalogueItems,
        }
      }
    })

    for (const plan of plans) {
      await this.patchPlan(this.currentProject?.id as string, plan)
    }
  }

  getPlan = (planId: string) => {
    const plans = this.plans
    const plan = plans.find((p) => p.id === planId) as Plan
    let planDetails = {} as PlanDetails

    if (plan?.planDetails) {
      planDetails = JSON.parse(plan?.planDetails as string)
    }

    this.catalogueItems = plan?.catalogueItems as CatalogueItem[] || planDetails?.catalogueItems || []

    return [plan, planDetails]
  }

  updatePlanCategory = (
    planId: string,
    newCatalogueItems: CatalogueItem[],
  ) => {
    const plans = this.plans
    
    plans.forEach((plan, index) => {
      if (plan.id === planId) {
        plans[index] = {
          ...plan,
          catalogueItems: newCatalogueItems,
        }
      }
    })

    this.plans = plans
    this.catalogueItems = newCatalogueItems
  }

  updatePlanCopy = (planId: string, newCopy: Copy) => {
    const plans = this.plans

    plans.forEach((plan, index) => {
      if (plan.id === planId) {
        plans[index] = {
          ...plan,
          copy: newCopy,
        }
      }
    })

    this.plans = plans
  }

  generateCopy = async (plan: Plan, projectID: string) => {
    await SyncAPI.plans.generateCopy(plan)
    await this.reloadProject(projectID)
  }

  unauthedGetPresentationData = async (orgID: string, projectID: string) => {
    return await SyncAPI.presentation.get(orgID, projectID)
  }

  unauthedDownloadPhotoForProject = async (
    orgID: string,
    projectID: string,
    imageID: string
  ) => {
    return await SyncAPI.presentation.downloadImage(orgID, projectID, imageID)
  }
}

const ModelStore = new _ModelStore()
export default ModelStore
