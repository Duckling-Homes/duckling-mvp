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
  photoUrl?: any
  name?: string
  homeownerNotes?: string
  internalNotes?: string
  room?: string
  envelope?: string
  appliance?: string
  electrical?: string
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
