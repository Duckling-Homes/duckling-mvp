export interface Project {
  id?: string
  name?: string
  homeownerName?: string
  homeownerPhone?: string
  homeownerEmail?: string
  homeownerAddress?: string
  createdAt?: string
  data?: ProjectData
  rooms?: ProjectRoom[]
  appliances?: ProjectAppliance[]
  electrical?: ProjectElectrical[]
  envelopes?: ProjectEnvelope[]
  images?: PhotoDetails[]
  plans?: Plan[]
  heroImageId?: string
}

export interface ProjectData {
  squareFootage?: number
  roomCount?: number
  bathroomCount?: number
  stories?: number
  yearBuilt?: number
  basementType?: string
  comfortIssueTags?: string[]
  comfortIssueNotes?: string
  healthSafetyIssueTags?: string[]
  healthSafetyIssueNotes?: string
  homeownerGoalsTags?: string[]
  homeownerGoalsNotes?: string
  [key: string]: number | string | string[] | undefined
}

export interface PhotoDetails {
  id?: string
  photoUrl?: any
  name?: string
  homeownerNotes?: string
  internalNotes?: string
  roomId?: string
  envelopeId?: string
  applianceId?: string
  electricalId?: string
  isHeroPhoto?: boolean
}

// TODO: Remove this?
export interface NewProject {
  id?: string
  name: string
  homeownerName: string
  homeownerPhone: string
  homeownerEmail: string
  homeownerAddress: string
}

export interface ProjectEnvelope {
  id?: string
  name?: string
  type?: string
  leakinessDescription?: string
  insulationLocation?: string
  insulationCondition?: string
  notes?: string
  projectId?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: number | string | string[] | undefined
}

export interface ProjectRoom {
  id?: string
  name?: string
  type?: string
  width?: number
  length?: number
  ceilingHeight?: number
  floor?: string
  usage?: string
  comfortIssueTags?: string[]
  safetyIssueTags?: string[]
  notes?: string
  projectId?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: number | string | string[] | undefined
}

export interface ProjectAppliance {
  id?: string
  name?: string
  type?: string
  systemType?: string
  hvacSystemType?: string
  havcSystem?: string
  fuel?: string
  age?: number
  manufacturer?: string
  modelNumber?: string
  serialNumber?: string
  heatingCapacity?: number
  coolingCapacity?: number
  tankVolume?: number
  location?: string
  notes?: string
  isInduction?: boolean
  [key: string]: number | string | string[] | boolean | undefined
}

export interface ProjectElectrical {
  id?: string
  name?: string
  type?: string
  panelType?: string
  panelAmperageRating?: number
  availableNewCircuits?: number
  total15AmpCircuits?: number
  total20AmpCircuits?: number
  total30AmpCircuits?: number
  total40AmpCircuits?: number
  total50AmpCircuits?: number
  total60AmpCircuits?: number
  total70AmpCircuits?: number
  notes?: string
  ownership?: string
  moduleType?: string
  tracking?: string
  arrayOrientation?: string
  arrayTilt?: number
  maxPowerOutput?: number
  numberOfPanels?: number
  annualOutput?: number
  chargingLevel?: string
  amperage?: number
  acPowerSourceVolatge?: number
  maxChargingPower?: number
  totalCapacity?: number
  ratedPowerOutput?: number
  ratedPeakOutput?: number
  gridConnected?: string
  generatorType?: string
  fuelType?: string
  ratedContinuousWattage?: number
  ratedPeakWattage?: number
  voltage?: number
  numberOfPhases?: string
  transferSwitch?: string
  connection?: string
  yearInstalled?: number
  manufacturer?: string
  modelNumber?: string
  serialNumber?: string
  location?: string
  [key: string]: number | string | string[] | boolean | undefined
}

export interface Organization {
  name: string
}

export interface VisualizerTextBlock {
  id: string
  color: string
  text: string
  position: { x: number; y: number }
  scale: number
}

export interface UpdateVisualizerTextBlock {
  color?: string
  text?: string
  position?: { x: number; y: number }
  scale?: number
}

export interface ApplianceMarkupSticker {
  type?: string
  make?: string
  model?: string
  angle?: string
  sticker?: string
}

export interface ApplianceSticker {
  id: string
  image: HTMLImageElement
  position: { x: number; y: number }
  scale: number
}

export interface UpdateApplianceSticker {
  url?: string
  position?: { x: number; y: number }
  scale?: number
}

export interface Plan {
  id?: string
  name?: string
  planDetails?: PlanDetails | string
  projectId?: string
  copy?: {
    comfort: string,
    health: string,
    recommended: string,
    summary: string
  }
}

export interface PlanDetails {
  selectedIncentives: string[]
  [key: string]: CatalogueItem[] | string[]
  imageIds: string[]
}

export interface CatalogueItem {
  id?: string
  customId?: string
  customName?: string
  quantity?: number | string
  category?: string
  subcategory?: string
  name?: string
  description?: string
  type?: string
  pricingType?: string
  scaledPricingMetric?: string
  basePricePer?: number
  brand?: string
  modelNumber?: string
  ahriNumber?: string
  incentives?: Incentive[]
  organizationId?: string
  organization?: Organization
}

export interface Incentive {
  id?: string
  name?: string
  descriptionText?: string
  calculationType?: string
  calculationRateValue?: number
  maxLimit?: string
  type?: string
}

export interface FinancingOption {
  id?: string
  name?: string
  provider?: string
  description?: string
  link?: string
  minAPR?: number
  maxAPR?: number
  minAmount?: number
  maxAmount?: number
  termLengths?: number[]
  organizationId?: string
}

export interface ProductCatalogue {
  id?: string
  category?: string
  subcategory?: string
  name?: string
  description?: string
  type?: string
  pricingType?: string
  scaledPricingMetric?: string
  basePricePer?: number
  brand?: string
  modelNumber?: string
  ahriNumber?: string
  incentives?: Incentive[]
  organizationId?: string
}
