import { InputProps } from "../interfaces/inputInterface";

export default function ChangeProject({ changeCheckbox, data }: InputProps) {
return (
    <div className="flex justify-end mb-6 text-end">
      <label className={data === "large" ?  "block font-medium text-sm px-3 py-1 text-blue-30" : "block font-medium text-sm px-3 py-1 text-blue-25"}>
        <input
          checked={data === "large"}
          className="peer sr-only"
          onChange={changeCheckbox}
          type="radio"
          name="project"
          value="large"
        />
            Основний
            {data === "large" && <div className="w-full h-[1px] bg-blue-30"></div>}
      </label>

        <label className={data === "small" ?  "block font-medium text-sm px-3 py-1 text-blue-30" : "block font-medium text-sm px-3 py-1 text-blue-25"}>
        <input
          checked={data === "small"}
          className="peer sr-only"
          onChange={changeCheckbox}
          type="radio"
          name="project"
          value="small"
        />
            Знижений
            {data === "small" && <div className="w-full h-[1px] bg-blue-30"></div>}
      </label>

      
    </div>
  );

}