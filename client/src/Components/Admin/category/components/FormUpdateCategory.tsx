import { useForm } from "react-hook-form";
import { useOpenFormStoreCategory } from "../store/useOpenForm.store";
import ButtonClose from "../../../ui/ButtonClose";
import Input from "../../../ui/Input";
import { useRowValueCategoryStore } from "../store/useRowValueCategory.store";
import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../../../../api/category";
import {
  IResponseUpdateCategory,
  IUpdateCategory,
} from "../../../../types/category.type";
import { MySwal } from "./ButtonsActionTable";
import { queryClient } from "../../../../main";
interface FormValues {
  name: string;
}
const FormUpdateCategory = () => {
  const { setOpenForm } = useOpenFormStoreCategory((state) => state);
  const { rowValue } = useRowValueCategoryStore((state) => state);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: IUpdateCategory) => await updateCategory(data),
    onSuccess: (data: IResponseUpdateCategory) => {
      MySwal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenForm("edit");
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ id: rowValue?.id, name: data.name });
  });
  return (
    <div className="w-96 p-4 flex flex-col gap-4 shadow-md bg-bg rounded-md">
      <ButtonClose
        onClick={() => setOpenForm("edit")}
        className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center self-end"
      />
      <div>
        <h2 className="  font-bold text-white ">
          Edit Category {rowValue?.name}
        </h2>
      </div>

      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="name category"
          labelText="Name category"
          labelClass="text-white"
          className="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 "
          register={register("name")}
        />
        <div className="flex gap-2 justify-end mt-4">
          <button
            type="button"
            onClick={() => setOpenForm("edit")}
            className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
          >
            cancel
          </button>
          <button className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormUpdateCategory;
