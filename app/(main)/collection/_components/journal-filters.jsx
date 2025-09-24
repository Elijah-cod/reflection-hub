"use client"

import { Input } from "@/components/ui/input"
import { Calendar1Icon, Search } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOODS } from "@/app/lib/moods";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns";


const JournalFilters = ({entries}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectMood, setSelectMood] = useState('')
    const [date, setDate] = useState(null)
    const [filteredEntries, setFilteredEntries] = useState(entries)


    return(
        <div>
            <div>
                <Input
                    placeholder = "Search entries ...."
                    value = {searchQuery}
                    onChange = {(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    prefix = {<Search className="h-4 w-4 text-gray-400"/>}
                />
            </div>
            <Select value={selectMood} onValueChange={setSelectMood}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by mood" />
                </SelectTrigger>
                <SelectContent>
                    {Object.values(MOODS).map((mood) => (
                    <SelectItem key={mood.id} value={mood.id}>
                        <span className="flex items-center gap-2">
                        {mood.emoji} {mood.label}
                        </span>
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <Calendar1Icon className="h-4 w-4" />
                        {
                            date ? format(date, "PPP") : <span>Pick a Date</span>
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default JournalFilters