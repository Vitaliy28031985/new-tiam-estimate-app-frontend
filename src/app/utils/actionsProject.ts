'use server'


   
export const saveProject = async (formData: FormData) => {
    let data = Object.fromEntries(formData.entries());
    
    return data;
}
    


