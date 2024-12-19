interface ProjectId {
  id: string;
  userId: string;
  allowLevel: string;
  lookAt: string;
  lookAtTotals: string;
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  role: string;
  token: string;
  refreshToken: string;
  verifyCode: string;
  verify: boolean;
  verificationToken: string | null;
  projectIds: ProjectId[];
  createdAt: string;
  updatedAt: string;
}
