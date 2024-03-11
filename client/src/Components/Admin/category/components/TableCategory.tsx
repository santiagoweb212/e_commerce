import { useMutation } from "@tanstack/react-query";
import { ICategory } from "../../../../types/category.type";
import { formatDate } from "../../../../utils/fomatDate";
import ButtonsActionTable from "./ButtonsActionTable";
import { toast,ToastContainer } from "react-toastify";
import { deleteCategoryById } from "../../../../api/category";
import { queryClient } from "../../../../main";
interface ITableCategoryProps {
  data: ICategory[];
}
interface ITableColumns {
  accessorKey: string;
  header: string;
  cell?: any;
}
interface ITableRow extends ICategory {
  action?: string;
  cell?: any;
}
const TableCategory = ({ data }: ITableCategoryProps) => {
  const notify = (message: string) => toast(message);
  const mutation =  useMutation({
    mutationFn: async (id: number) => await deleteCategoryById(id),
    onSuccess: (data) => {
      notify(data.message);
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  })
  const columns: ITableColumns[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "createAt",
      header: "Created At",
      cell: (cell: ITableRow) => {
      
        return <span>{formatDate(cell.createAt)}</span>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (cell: ITableRow) => {
        
       return <ButtonsActionTable mutation={mutation} cell={cell}/>
      }
    },
  ];
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" sticky top-32 bg-bg before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-b before:border-gray-700 text-white text-left text-xs ">
          <tr className="">
            {columns &&
              columns.map((col) => (
                <th
                  key={col.accessorKey}
                  scope="col"
                  className={`${
                    col.accessorKey === "id" &&
                    "text-center w-14  "
                  } ${col.accessorKey === "name" && " "} ${
                    col.accessorKey === "createAt" && "whitespace-nowrap w-72 text-left  "
                  } ${col.accessorKey === "action" && "w-14 text-center px-4"} py-4  text-white font-medium  leading-4 uppercase shadow-md `}
                >
                  {col.header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data &&
            data.map((row: ITableRow) => (
              <tr key={row.id} className="">
                {columns &&
                  columns.map((col: ITableColumns) => (
                    <td
                      key={col.accessorKey}
                      className={` ${
                        col.accessorKey === "createAt" &&
                        " whitespace-nowrap px-0 text-left"
                      } ${col.accessorKey === "id" && "text-center "} ${
                        col.accessorKey === "action" && "text-center"
                      } text-left py-4 `}
                    >
                      { "cell" in col ? (
                        col.cell(row)
                      ) : (
                        row[col.accessorKey as keyof ITableRow]
                      )}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer />
      </>
  );
};
export default TableCategory;
