
export interface QRQCAreaDto {
    id: number;
    name: string;
    available: boolean;
    LastUpdated: Date;
    LastUpdaterId: number;
}

export interface QRQCPositionAuditedDto {
    id: number;
    name: string;
    available: boolean;
    LastUpdated: Date;
    LastUpdaterId: number;
}
export interface QRQCQuestionDto {
    id: number;
    text: string;
    calificationPercentage: number;
    positionAuditedId: number;
    available: boolean;
    lastUpdated?: Date | null;
    order: number;
    lastUpdaterId: number;
}

export interface QRQCAnswerDto {
    id: number;
    text: string;
    isOk: boolean;
    available: boolean;
    lastUpdated: Date;
    lastUpdaterId: number;
    order: number;
}

export interface QRQCQuestionAnswerConfigDto {
    questionId: number;
    answerId: number;
    text: string;
    available: boolean;
}
export interface QRQCShiftDto {
    id: number;
    name: string;
    available: boolean;
    lastUpdated: Date;
    lastUpdaterId: number;
}
export interface QRQCAuditDto {
    id: number;
    projectId: number;
    areaId: number;
    isOpen: boolean;
    auditorId: number;
    dateTimeStarted: Date;
    dateTimeFinished?: Date;
    weekJabilId: number;
    available: boolean;
    lastUpdate?: Date;    
}
export interface QRQCAuditDetailDto {
    id: number;
    auditId: number;
    shiftId?: number;
    responsible: string;
    caseNumber?: number;
    available: boolean;
    withOutCase?: boolean|undefined;
    lastUpdate?: Date;
    lastUpdaterId?: number;
    questions: QRQCQuestionAuditDto[];
    positionAuditedId: number;  
    comments?: string;
}

export interface QRQCQuestionAuditDto {
    id:number;
    text:string;
    calificationPercentage:number;
    positionAuditedId:number;
    selectedAnswerId?:number;
    selectedAnswerText?:string;
    answers?:QRQCQuestionAnswerAuditDto[];
}
export interface QRQCQuestionAnswerAuditDto {
    id:number;
    text:string;
    isOk:boolean;
    order:number;
}