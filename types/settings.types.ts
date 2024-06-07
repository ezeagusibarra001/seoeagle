export interface Projects {
  company: string;
  companyCountry: string;
  titleExample: string;
  urlExample: string;
  whatCompanyDo: string;
}

export interface CompleteProject extends Projects {
  userId: string | null;
  id: string;
}
