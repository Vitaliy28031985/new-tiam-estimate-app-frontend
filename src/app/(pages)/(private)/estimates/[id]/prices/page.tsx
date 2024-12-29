import PricesToggle from "@/app/components/Project/Prices/PricesToggle";


export default async function  MaterialsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;

  return (
      <main className="bg-gray-0 pt-20 pb-20">
      <div className="w-[960px] mx-auto shadow-base p-8 bg-white rounded-3xl">
        <div className="h-[203px]"></div>
          <PricesToggle projectId={projectId} />
          </div>
    </main>
  );
}