
export interface Variable {
    id: number;
    version: number; 
    informationLevel: InformationLevel;
    category: Category;
    dataType: DataType;
    registrationMethod: RegistrationMethod;
    status: Status;
    techName: string;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    validFrom: string;
    createdOn: string;
    dataSize: number;
    validForExtraction: number; 
    variableType: VariableType;
    publicVariable: boolean;
  }

  export interface InformationLevel {
    id: number;
    name: string;
    nameEn: string;
    shortName?: string;
    sortering: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    sortering: number;
    parent: Category | null;
  }
  
  export interface DataType {
    id: number;
    name: string;
    nameEn: string;
    sortering: number | null; 
    description: string;
    descriptionEn: string;
  }
  
  export interface RegistrationMethod {
    id: number;
    name: string;
    nameEn: string;
    mappedName?: string;
    description: string;
    descriptionEn: string;
    sortering: number;
  }
  
  export interface Status {
    id: number;
    name: string;
    nameEn: string;
    description: string | null; 
    descriptionEn: string | null; 
  }
  
  export interface VariableType {
    id: number;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    managed: boolean;
    createdBy: string | null;
    createdOn: string | null;
    updatedBy: string | null;
    updatedOn: string | null;
    deletedBy: string | null;
    deletedOn: string | null;
  }
  