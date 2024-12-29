import Project from "@/app/components/Project/Project";

export default function EstimateIdLayout(
  {
    params,
    children,
  }: {
    params: { id: string };
    children: React.ReactNode;
  }
) {
  const projectId = params.id; 
  return (
    <div className=" ">
      <Project projectId={projectId} />   
      {children}
    </div>
  );
}

