// User type as for D3 class diagram
export interface User {
  id?: string;
  name?: string;
  surname?: string;
  username: string;
  email?: string;
  password: string;
  creationDate?: Date;
  lastUpdate?: Date;
  deletedOn?: Date;
  description?: string;
  sex?: string;
  age?: number;
}

export interface UserInfo {
  username: string;
  email: string;
  surname: string;
  name: string;
  description: string;
}

export enum Language {
  IT = 'IT',
  EN = 'EN',
}
export enum Visibility {
  HIDDEN = 'hidden',
  PUBLIC = 'public',
}
export interface UserSettings {
  language: Language;
  visibility: Visibility;
}
