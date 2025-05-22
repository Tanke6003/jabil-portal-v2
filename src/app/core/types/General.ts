export interface TokenProperties {
    sub: string;
    unique_name: string;
    role: string;
    department: string;
    nbf?: number; // Optional property for "Not Before" timestamp
    exp?: number; // Optional property for expiration timestamp
}

export interface LastTwelveWeeksItem {
    year: number;
    week: number;
    score: number;
    goal: number;
}

export interface ParetoItem {
    detractorId: number;
    detractor: string;
    quantity: number;
    contribution: number;
}

export interface LastWeekItem {
    projectName: string;
    score: number;
    goal: number;
}

export interface ChartItem {
    column: string;
    value: number;
    secondValue?: number;
}

export interface Project {
    id: number;
    name: string;
    available: boolean;
    buildingId: number;
}

export interface Line {
    id: number;
    name: string;
    available: boolean;
    projectId: number;
}

export interface DiscrepancyRecordDto {
    ID: number;
    LineID?: number;
    ProjectID:number;
    StationID: number;
    DepartmentID: number;
    DiscrepancyID: number;
    WorkdayId: number;
    Comment?: string; // Optional
    Available?: boolean; // Optional
    CreatedBy?: number; // Optional
    UpdatedBy?: number; // Optional
    ShiftID: number;
    LPALevelID: number;
    Date: string;
    ReasonId: number;
    MID: number;
}

export interface DiscrepancyReportDto {
    discrepancyDate:Date;
    projectName:string;
    departmentName:string;
    shift:string;
    stationName:string;
    m:string;
    discrepancyName:string;
    reasonName:string;
    comment:string;
    reportedBy:string;
    createdDate:Date;
    createdUser:string;
}
export interface Site{
    id:number;
    name:string;
    available:boolean;
}
export interface Building{
    id:number;
    name:string;
    available:boolean;
    siteId:number;
}

export interface Login{
    email:string;
    password:string;
}
export interface User{
    id:number;
    fullName:string;
    ntUser:string;
    email:string;
    available:boolean;
    lastUpdatedBy:number;
    roleId:number;
}
export interface Shift{
    id:number;
    name:string;
    available:boolean;
}
export interface Station{
    id:number;
    name:string;
    available:boolean;
}
export interface Department{
    id:number;
    name:string;
    available:boolean;
}
export interface Discrepancy{
    id:number;
    name:string;
    available:boolean;
    ishikawaID:number;
}
export interface Reason{
    id:number;
    name:string;
    discrepancyId:number;
    available:boolean;
    }


    export interface ApplicationReadDto {
  id: number;
  name: string;
  description?: string;
  url?: string;
  server?: string;
  repository?: string;
  ownerId?: number;
  supportEmail: string;
  smeEmail?: string;
  dbServer?: string;
  createdAt: Date;
  available: boolean;
}
export interface TicketReadDto {
  id: number;
  applicationId: number;
  title: string;
  description?: string;
  status: string;
  createdById: number;
  createdDate: Date;
  assignedToId?: number;
}

export interface CommentReadDto {
  id: number;
  ticketId: number;
  authorId: number;
  authorName: string;
  comment: string;
  createdAt: Date;
}

export interface TicketCreateDto {
  applicationId: number;
  title: string;
  description?: string;
  createdById: number;
}

export interface ApplicationCreateDto {
  name: string;
  description?: string;
  url?: string;
  server?: string;
  repository?: string;
  ownerId?: number;
  supportEmail: string;
  smeEmail?: string;
  dbServer?: string;
  available: boolean;
}
