import { getJournalEntries } from "@/actions/journal";
import React from "react";
import { getCollection } from "@/actions/collection";
import DeleteCollectionDialog from "../_components/delete-collection";
import JournalFilters from "../_components/journal-filters";


const CollectionsPage = async({params}) => {
    const {collectionid} =  await params
    const [entries, collection] = await Promise.all([
        getJournalEntries({ collectionId: collectionid }),
        collectionid === "unorganized" ? Promise.resolve(null) : getCollection(collectionid),
    ])

    return(
        <div className="space-y-6">
            <div className="flex flex-col justify-between">
                <div className="flex justify-between mt-5">
                    <h1 className="text-4xl font-bold gradient-title">
                        {
                            collectionid === "unorganized" ? "Unorganized Entries" : collection?.name || "Collection"
                        }
                    </h1>
                    {
                        collection && <DeleteCollectionDialog collection = {collection} entriesCount = {entries.data.entries.length} />
                    }
                </div>
                {
                    collection?.description && (
                        <h2 className="font-extralight pl-1">{collection?.description}</h2>
                    )
                }
            </div>

            {/* Render entries */}
            <JournalFilters entries = {entries.data.entries}/>
        </div>
    )
}


export default CollectionsPage
