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
}
