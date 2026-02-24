// interfaces used across the project for API interactions

export interface UserData {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export interface ApiResponse<T = any> {
  responseCode: number;
  message?: string;
  [key: string]: any; // allow additional properties depending on endpoint
}

export interface ProductSearchResult {
  products: Array<any>;
  [key: string]: any;
}
