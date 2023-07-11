import * as mongodb from "mongodb";

export interface Employee{
    name: string;
    postion: string;
    level : 'junior' | 'mid' | 'senior';
    _id?: mongodb.ObjectId
}