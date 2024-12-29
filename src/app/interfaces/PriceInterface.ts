export interface Price {
    _id: string;         
    id: string;           
    title: string;       
    price: number;        
    updateAllow: boolean; 
    owner: string;       
    createdAt: string;    
    updatedAt: string;
    isShow?: boolean;
    isDelete?: boolean;
}

export interface UpdatePrice {
    id?: string;
    priceId?: string;
    title: string;       
    price: string | number;  
}
