import { Expense } from "@/types/expense";
import { Income } from "@/types/income";

const setMonthYear = (date: string) => {
  const expenseMonth = parseInt(date.split("-", 2)[1]);
  const expenseYear = parseInt(date.split("-", 2)[0]);
  return expenseYear + "-" + expenseMonth;
};

type Data = Expense | Income;

export default function useGetData(
  arrAllData: Data[],
  date: string 
) {
  const monthData: Data[] = [];
  arrAllData.forEach((element: Data) => {
    if (setMonthYear(element.date) === setMonthYear(date)) {
      monthData.push(element);
    }
  });

  const arrayDataAmount: number[] = [];
  monthData.forEach((element: Data) =>
    arrayDataAmount.push(Number(element.amount))
  );
  
  const totalAmount = arrayDataAmount.reduce((a, b) => a + b, 0);

  return { monthData, totalAmount };
}
