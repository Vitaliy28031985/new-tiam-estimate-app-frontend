import { grtPaginationArr } from "@/app/utils/formatFunctions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface EstimatePaginationProps {
    changePage: (direction: string) => void;
    changePageButton: (currentPage: number) => void;
    amountPages: number | undefined;
    page: number;

}

const EstimatesPagination: React.FC<EstimatePaginationProps> = ({changePage, changePageButton, amountPages, page}) => {

    const amountPagesArr = grtPaginationArr(amountPages);
    // console.log(amountPagesArr)
    return (
        <div className="flex items-center gap-8">
           <button type="button" onClick={() => changePage("-")}><ChevronLeftIcon className="size-8 text-blue-30" /></button> 
            <div className="flex items-center gap-4 " >
                {amountPagesArr?.map(item => (
                    <div className={`${item === page ? "cursor-pointer py-2 px-4 rounded-md bg-white text-sm font-bold" : "cursor-pointer text-sm font-normal p-2 rounded-md"}`} id={item.toString()} onClick={() => changePageButton(item)}>{item}</div>
              ))}  
           </div>
            <button type="button" onClick={() => changePage("+")}><ChevronRightIcon className="size-8 text-blue-30" /></button>  
        </div>
    )
}

export default EstimatesPagination;