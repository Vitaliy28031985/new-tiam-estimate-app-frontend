import { InputProps } from "../interfaces/inputInterface";

export default function ChangeSettingsProject({ changeCheckbox, data }: InputProps) {
return (
    <div className="flex justify-center mb-6 text-end flex-wrap">
      <label className={data === "add-allow" ?  "block font-medium text-sm px-3 py-1 text-blue-30" : "block font-medium text-sm px-3 py-1 text-blue-25"}>
        <input
          checked={data === "add-allow"}
          className="peer sr-only"
          onChange={changeCheckbox}
          type="radio"
          name="settings"
          value="add-allow"
        />
            Надати дозвіл
            {data === "add-allow" && <div className="w-full h-[1px] bg-blue-30"></div>}
      </label>

        <label className={data === "update-allow" ?  "block font-medium text-sm px-3 py-1 text-blue-30" : "block font-medium text-sm px-3 py-1 text-blue-25"}>
        <input
          checked={data === "update-allow"}
          className="peer sr-only"
          onChange={changeCheckbox}
          type="radio"
          name="settings"
          value="update-allow"
        />
           Редагувати дозвіл
            {data === "update-allow" && <div className="w-full h-[1px] bg-blue-30"></div>}
    </label>
    
       <label className={data === "delete-allow" ?  "block font-medium text-sm px-3 py-1 text-blue-30" : "block font-medium text-sm px-3 py-1 text-blue-25"}>
        <input
          checked={data === "delete-allow"}
          className="peer sr-only"
          onChange={changeCheckbox}
          type="radio"
          name="settings"
          value="delete-allow"
        />
           Забрати дозвіл
            {data === "delete-allow" && <div className="w-full h-[1px] bg-blue-30"></div>}
    </label>
    
        <label className={data === "discount" ?  "block font-medium text-sm px-3 py-1 text-blue-30" : "block font-medium text-sm px-3 py-1 text-blue-25"}>
        <input
          checked={data === "discount"}
          className="peer sr-only"
          onChange={changeCheckbox}
          type="radio"
          name="settings"
          value="discount"
        />
           Встановити знижку
            {data === "discount" && <div className="w-full h-[1px] bg-blue-30"></div>}
    </label>
    
         <label className={data === "low-estimate" ?  "block font-medium text-sm px-3 py-1 text-blue-30" : "block font-medium text-sm px-3 py-1 text-blue-25"}>
        <input
          checked={data === "low-estimate"}
          className="peer sr-only"
          onChange={changeCheckbox}
          type="radio"
          name="settings"
          value="low-estimate"
        />
           Сформувати знижений кошторис
            {data === "low-estimate" && <div className="w-full h-[1px] bg-blue-30"></div>}
    </label>

      
    </div>
  );

}