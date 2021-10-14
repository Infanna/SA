
import { SexInterface } from "./ISex";
import { JobInterface } from "./IJob";
import { InsuranceInterface } from "./IIns";
import { UserInterface } from "./IUser";

export interface PatientInterface {

    ID: number,
   
    PatientFirstname: string;
   
    PatientLastname: string;
   
    PatientAge: number;

    PatientIDcard: String;

    PatientTel: string;

    PatientTime: Date;

    SexID: number;

    JobID: number;

    InsuranceID: number;

    UserID: number;

    Sex: SexInterface;

    Job: JobInterface;

    Insurance: InsuranceInterface;

    User: UserInterface;



   }