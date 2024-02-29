import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  export const TableOfContracts = () => {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="h-[80px]">
          <TableRow>
            <TableHead className="w-[100px]">№ П/П</TableHead>
            <TableHead>Номер договора</TableHead>
            <TableHead>Способ размещения</TableHead>
            <TableHead>Дата договора</TableHead>
            <TableHead>Предмет договора</TableHead>
            <TableHead>Подразделение</TableHead>
            <TableHead className="flex flex-col"><span>Поставщик,</span><span>подрядчик,</span><span>исполнитель</span></TableHead>
            <TableHead>Сумма договора</TableHead>
            <TableHead>Фактически оплачено</TableHead>
            <TableHead>Цвет</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }