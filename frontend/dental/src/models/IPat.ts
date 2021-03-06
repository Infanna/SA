
import { SexInterface } from "./ISex";
import { JobInterface } from "./IJob";
import { InsuranceInterface } from "./IIns";
import { UserInterface } from "./IUser";

export interface PatientInterface {

    ID: number,
   
    Firstname: string;
   
    Lastname: string;
   
    Age: number;

    IDcard: string;

    Tel: string;

    Time: Date;

    SexID: number;

    JobID: number;

    InsuranceID: number;

    UserNurseID: number;

    Sex: SexInterface;

    Job: JobInterface;

    Insurance: InsuranceInterface;

    UserNurse: UserInterface;

   }