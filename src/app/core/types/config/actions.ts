export interface ActionDto{
    id: number;
    projectID: number;
    metricId: number;
    name: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
    w5: string;
    h1: string;
    h2: string;
    why1: string;
    why2: string;
    why3: string;
    why4: string;
    why5: string;
    actionTasks?: ActionTaskDto[]; 
  }
  export interface ActionTaskDto{
    id:number;
    actionID: number;
    typeID: number;
    name: string;
    description: string;
    responsible: string;
    createdDate: string;
    dueDate: string;
    evidencePath?:string|null|undefined;
    statusID: number;
    comment?: string;
  }
  export interface ActionTaskEvidenceDto{
    actionTaskId: number;

    evidencePath?: string;
    evidence?: File;
  }
