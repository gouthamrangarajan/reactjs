export interface userType {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: addressType;
  company: companyType;
}
export interface addressType {
  street: string;
  suit: string;
  city: string;
  zipcode: string;
  geo: geoType;
}
export interface geoType {
  lat: number;
  lng: number;
}
export interface companyType {
  name: string;
  catchPhrase: string;
  bs: string;
}
