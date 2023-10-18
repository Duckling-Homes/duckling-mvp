
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
}

export interface ProjectData {
  squareFootage?: number,
  roomCount?: number,
  bathroomCount?: number,
  stories?: number,
  yearBuilt?: number,
  basementType?: string,
  comfortIssueTags?: string[],
  comfortIssueNotes?: string,
  healthSafetyIssueTags?: string[],
  healthSafetyIssueNotes?: string,
  homeownerGoalsTags?: string[],
  homeownerGoalsNotes?: string,
  [key: string]: number | string | string[] | undefined;
}

// TODO: Remove this?
export interface NewProject {
  id?: string,
  name: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerEmail: string;
  homeownerAddress: string;
}

export interface ProjectEnvelope {
  "id": string,
  "name"?: string,
  "type"?: string,
  "width"?: number,
  "length"?: number,
  "ceilingHeight"?: number,
  "floor"?: string,
  "usage"?: string,
  "comfortIssueTags"?: string[],
  "safetyIssueTags"?: string[],
  "notes"?: string,
  "projectId"?: string,
  "createdAt"?: string,
  "updatedAt"?: string,
  [key: string]: number | string | string[] | undefined;
}

export interface ProjectRoom {
  "id": string,
  "name"?: string,
  "type"?: string,
  "width"?: number,
  "length"?: number,
  "ceilingHeight"?: number,
  "floor"?: string,
  "usage"?: string,
  "comfortIssueTags"?: string[],
  "safetyIssueTags"?: string[],
  "notes"?: string,
  "projectId"?: string,
  "createdAt"?: string,
  "updatedAt"?: string,
  [key: string]: number | string | string[] | undefined;
}

export interface ProjectAppliance {
  id: string;
  name?: string;
  type?: string;
  hvac_system_type?: string;
  havc_system?: string;
  fuel?: string;
  age?: number;
  manufacturer?: string;
  model_number?: string;
  serial_number?: string;
  heating_capacity?: number;
  cooling_capacity?: number;
  tank_volume?: number;
  location?: string;
  notes?: string;
  is_indution?: boolean;
}


export interface ProjectElectrical {
  "id": string,
  "name"?: string,
  "type"?: string,
  "width"?: number,
  "length"?: number,
  "ceilingHeight"?: number,
  "floor"?: string,
  "usage"?: string,
  "comfortIssueTags"?: string[],
  "safetyIssueTags"?: string[],
  "notes"?: string,
  "projectId"?: string,
  "createdAt"?: string,
  "updatedAt"?: string,
  [key: string]: number | string | string[] | undefined;
}
export interface Organization {
  name: string;
}