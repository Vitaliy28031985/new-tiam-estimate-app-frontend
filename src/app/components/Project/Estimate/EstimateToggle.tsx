import EstimateItem from "./Estimate";

 
 interface EstimateToggleProps {
  projectId: string;
}

const EstimateToggle: React.FC<EstimateToggleProps> = ({ projectId }) => {
    return (
        <div>
           <div className="flex items-center justify-end gap-6 mt-6 mb-6">
                <div> <button className="block font-medium text-sm px-3 py-1 text-blue-25" >Основний</button><div className="w-full h-[1px] bg-blue-25"></div></div>
                <div><button className="block font-medium text-sm px-3 py-1 text-blue-25" >Знижений</button><div className="w-full h-[1px] bg-blue-25"></div></div>
            </div>
            <EstimateItem projectId={projectId} />
        </div>
    )
 }

export default EstimateToggle;