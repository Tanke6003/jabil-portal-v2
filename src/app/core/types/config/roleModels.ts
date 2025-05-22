export class Role{
    public id:number;
    public name:string;
    public available:boolean;
    public lastUpdatedBy:number;
    constructor(id:number,name:string,available:boolean,lastUpdatedBy:number){
        this.id = id;
        this.name = name;
        this.available = available;
        this.lastUpdatedBy = lastUpdatedBy;
    }
}