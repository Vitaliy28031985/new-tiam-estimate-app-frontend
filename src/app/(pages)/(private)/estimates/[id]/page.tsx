import EstimateToggle from "@/app/components/Project/Estimate/EstimateToggle";

export default async function EstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
     

  return (
      <main className="bg-gray-0 pt-20 pb-20">
      <div className="w-[960px] mx-auto shadow-base p-8 bg-white rounded-3xl">
  
       <div className="h-[203px]"></div>
        
         <EstimateToggle projectId={projectId}/>
        
      </div>
       
    </main>
  );
}