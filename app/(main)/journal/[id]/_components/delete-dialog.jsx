"use client"
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { deleteJournalEntry } from "@/actions/journal";
import { toast } from "sonner";


const DeleteDialog = ({entryId}) => {
    const router = useRouter()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const {
        loading: iseDeleting,
        fn: deleteEntryFn,
        data: deletedEntry,
    } = useFetch (deleteJournalEntry)

    const handleDelete = () => {
        deleteEntryFn(entryId)
    }

    useEffect(()=> {
        if(deletedEntry && !iseDeleting) {
            setDeleteDialogOpen(false)
            toast.error(
                "Journal entry deleted successfully"
            )
            router.push(`/collection/${deletedEntry.collectionId ? deletedEntry.collectionId: "unorganized"}`)
        }
    }, [deletedEntry, iseDeleting])

    return(
        <AlertDialog deleteDialogOpen = {deleteDialogOpen} onOpenChange = {setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4"/>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your journal entry</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600" disabled = {iseDeleting}>{iseDeleting ?"Deleting...":"Delete Journal Entry"}</Button>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog