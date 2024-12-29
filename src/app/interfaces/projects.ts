export interface Projects {
  projects: {
    _id: string;
    title: string;
    description: string;
  }[];  
  total: number;
}

export interface ProjectsData {

    _id?: string;
    title: string;
    description: string;
    isShow?: boolean;
    isDelete?: boolean;

}

interface Price {
  id: string;
  title: string;
  price: number;
  updateAllow: boolean;
  owner: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface EstimatePosition {
  id: string;
  isShow?: boolean;
  isDelete?: boolean;
  title: string;
  unit: string;
  number: number;
  price: number;
  result: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Estimate {
  map(arg0: (item: EstimatePosition) => import("react").JSX.Element): import("react").ReactNode;
  id?: string;
  title: string;
  isShow?: boolean;
  isDelete?: boolean;
  isAdd?: boolean;
  positions?: EstimatePosition[];
  total?: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LowEstimatePosition {
  id: string;
  title: string;
  unit: string;
  number: number;
  price: number;
  result: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface LowEstimate {
  id: string;
  title: string;
  positions: LowEstimatePosition[];
  total: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  projectId?: string;
  isShow?: boolean;
  isDelete?: boolean;
  title: string;
  order: string;
  date: string;
  sum: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Advance {
  id: string;
  comment: string;
  date: string;
  sum: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  _id?: string;
  title?: string;
  description?: string;
  prices?: Price[];
  discount?: number;
  lowDiscount?: number;
  discountPercentage?: number;
  materialsTotal?: number;
  advancesTotal?: number;
  lowTotal?: number;
  total?: number;
  lowGeneral?: number;
  general?: number;
  owner?: string;
  estimates?: Estimate[];
  lowEstimates?: LowEstimate[];
  materials?: Material[];
  advances?: Advance[];
  lowPrices?: Price[];
}

