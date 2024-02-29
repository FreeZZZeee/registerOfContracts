"use client"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { FaRegEdit } from "react-icons/fa";
  

export const EditContract = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[50px]"><FaRegEdit className="w-full"/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать договор №</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Номер договора
              </Label>
              <Input id="name" value="123456" className="col-span-3" />
            </div>            
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}