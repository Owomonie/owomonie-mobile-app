export type FileDoc = {
  fileName: string;
  uri: string;
  mimeType: string;
};

export interface UserDetails {
  _id: string;
  ageRange: string;
  avatar: string;
  createdAt: string;
  email: string;
  firstName: string;
  gender: string;
  incomeRange: string;
  lastName: string;
  status: number;
  userName: string;
  workType: string;
  pushToken: string;
}

export interface Bank {
  id: string;
  logo: string;
  createdAt: string;
}

export interface Account {
  id: string;
  bankName: string;
  bankLogo: string;
  balance: number;
  createdAt: string;
  accountNo: string;
}

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  categoryUri: string;
  bankName: string;
  type: string;
  createdAt: string;
}
