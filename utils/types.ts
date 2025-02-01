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

export interface BankDetails {
  _id: string;
  bankLogo: string;
  bankName: string;
  bankSortCode: string;
  createdAt: string;
}
