export interface Position {
  projectId?: string | undefined;
  estimateId?: string | undefined;
  positionId?: string | undefined;
  title?: string |undefined;
  unit?: string  | undefined;
  number?: number;
  price?: number;
  
}

export interface Price {
  id: string;
  title: string;
  price: number;
  updateAllow: boolean;
  owner: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

