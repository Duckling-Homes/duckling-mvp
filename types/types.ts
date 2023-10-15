
export interface Project {
  id?: string;
  name?: string;
  homeownerName?: string;
  homeownerPhone?: string;
  homeownerEmail?: string;
  homeownerAddress?: string;
  createdAt?: string;
  data?: ProjectData;
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
}

export interface NewProject {
  name: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerEmail: string;
  homeownerAddress: string;
}