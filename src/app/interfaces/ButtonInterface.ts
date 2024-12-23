export interface ButtonBlueProps {
    title?: string;
    link?: string;
    isActive?: boolean;
    click?: () => void;
    type?: "button" | "submit" | "reset";
    // ph?: string,
    // pv?: string,
    // w?: string,
    // s?: string
}