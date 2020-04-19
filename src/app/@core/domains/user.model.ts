export class User {
    id: number;
    firstName: string;
    lastName: string;
    editMode: boolean;
}

export class UserModel {
  userid:any;
  email: string;
  username:string;
  password: string;
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export class ProspectiveModel {

  recNo:any;
  name:string;
  arName: string;
  fullName:string;
  active:string;
  companyName: string;
  email: string;
  note:string;
  contact: string;
  telephone1: string;
  telephone2: string; //not null
  countryRefKey: number;
  cityRefKey: number;
  streeRefKey: number;
  howKnowRefKey: number;
  webUserName: string;
  webCompanyName: string;

  lstProspectiveCotact: ProspectiveCotact[];

}

export class ProspectiveCotactId{
  recNo: number;
  lineNo: number;
}

export class ProspectiveCotact {
  prospectiveCotactId: ProspectiveCotactId;

  name: string;
  telephone1: string;
  fax: string;
  mobile1: string;

  email: string;
  position: string;
}
