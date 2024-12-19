export interface InputProps {
   title?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    message?: string;
    value?: string;
    data?: string;
    isError?: boolean;
    showButton?: boolean;
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    
}