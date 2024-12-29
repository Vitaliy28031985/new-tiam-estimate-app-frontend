import Project from "@/app/components/Project/Project";


export default async function EstimateIdLayout(
  {
    params,
    children,
  }: {
    params: { id: string };
    children: React.ReactNode;
  }
) {

  const projectId = (await params).id;
  return (
    <div className=" ">
      <Project projectId={projectId} />   
      {children}
    </div>
  );
}
