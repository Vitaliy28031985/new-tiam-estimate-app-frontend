import Project from "@/app/components/Project/Project";

export default async function EstimateIdLayout(
  {
    params,
    children,
  }: {
    params: Promise<{ id: string }>; 
    children: React.ReactNode;
  }
) {
  const { id } = await params; 
  return (
    <div>
      <Project projectId={id} />
      {children}
    </div>
  );
}

