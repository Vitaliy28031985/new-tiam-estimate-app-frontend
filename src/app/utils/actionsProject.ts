'use server'
   
export const saveProject = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    
    return data;
}
    


