
export interface Project {
  id?: string;
  name?: string;
  homeownerName?: string;
  homeownerPhone?: string;
  homeownerEmail?: string;
  homeownerAddress?: string;
  createdAt?: string;
  data?: ProjectData;
  rooms?: ProjectRoom[];
  appliances?: ProjectAppliance[];
  electrical?: ProjectElectrical[];
  envelopes?: ProjectEnvelope[];
}

export interface ProjectData {
  squareFootage?: number;
  roomCount?: number;
  bathroomCount?: number;
  stories?: number;
  yearBuilt?: number;
  basementType?: string;
  comfortIssueTags?: string[];
  comfortIssueNotes?: string;
  healthSafetyIssueTags?: string[];
  healthSafetyIssueNotes?: string;
  homeownerGoalsTags?: string[];
  homeownerGoalsNotes?: string;
  [key: string]: number | string | string[] | undefined;
}

// TODO: Remove this?
export interface NewProject {
  id?: string;
  name: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerEmail: string;
  homeownerAddress: string;
}

export interface ProjectEnvelope {
  id?: string;
  name?: string;
  type?: string;
  leakinessDescription?: string;
  insulationLocation?: string;
  insulationCondition?: string;
  notes?: string;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: number | string | string[] | undefined;
}

export interface ProjectRoom {
  id?: string;
  name?: string;
  type?: string;
  width?: number;
  length?: number;
  ceilingHeight?: number;
  floor?: string;
  usage?: string;
  comfortIssueTags?: string[];
  safetyIssueTags?: string[];
  notes?: string;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: number | string | string[] | undefined;
}

export interface ProjectAppliance {
  id?: string;
  name?: string;
  type?: string;
  systemType?: string;
  hvacSystemType?: string;
  havcSystem?: string;
  fuel?: string;
  age?: number;
  manufacturer?: string;
  modelNumber?: string;
  serialNumber?: string;
  heatingCapacity?: number;
  coolingCapacity?: number;
  tankVolume?: number;
  location?: string;
  notes?: string;
  isInduction?: boolean;
}


export interface ProjectElectrical {
  id?: string;
  name?: string;
  type?: string;
  panelType?: string;
  panelAmperageRating?: string;
  availableNewCircuits?: string;
  total15AmpCircuits?: string;
  total20AmpCircuits?: string;
  total30AmpCircuits?: string;
  total40AmpCircuits?: string;
  total50AmpCircuits?: string;
  total60AmpCircuits?: string;
  total70AmpCircuits?: string;
  notes?: string;
  ownership?: string;
  moduleType?: string;
  tracking?: string;
  arrayOrientation?: string;
  arrayTilt?: string;
  maxPowerOutput?: string;
  numberOfPanels?: number;
  annualOutput?: string;
  chargingLevel?: string;
  amperage?: string;
  acPowerSourceVolatge?: string;
  maxChargingPower?: string;
  totalCapacity?: string;
  ratedPowerOutput?: string;
  ratedPeakOutput?: string;
  gridConnected?: string;
  generatorType?: string;
  fuelType?: string;
  ratedContinuousWattage?: string;
  ratedPeakWattage?: string;
  voltage?: string | number;
  numberOfPhases?: number;
  transferSwitch?: string;
  connection?: string;
  yearInstalled?: number;
  manufacturer?: string;
  modelNumber?: string;
  serialNumber?: string;
  location?: string;
  [key: string]: number | string | string[] | boolean | undefined;
}
export interface Organization {
  name: string;
}