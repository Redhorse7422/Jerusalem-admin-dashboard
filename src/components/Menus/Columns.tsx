import Image from "next/image";
import { DownloadIcon, PreviewIcon } from "../Tables/icons";
import { TrashIcon, EditIcon } from "@/assets/icons";

const getColumns = (
    handleDelete: (category: Menu) => void,
    handleEdit: (category: Menu) => void
): TableColumn<Menu>[] => [
        // { key: "name", header: "Name", align: "left" },

        {
            key: "name", header: "Name", align: "left",
            render: (item) => (
                <div className="flex min-w-fit items-center gap-3">
                    <Image
                        src={item.thumbnail}
                        className="size-8 rounded-full object-cover"
                        width={40}
                        height={40}
                        alt={item.name + " Logo"}
                        role="presentation"
                    />
                    <div className="">{item.name}</div>
                </div>
            )
        },
        {
            key: "category", header: "Category", align: "left",
            render: (item) => (
                item.name
            )
        },
        { key: "slug", header: "Slug", align: "left" },
        { key: "description", header: "Description", align: "left" },
        { key: "price", header: "Price", align: "left" },
        {
            key: "actions",
            header: "Actions",
            align: "right",
            render: (item) => (
                <div className="flex items-center justify-end gap-x-3.5">
                    {/* <button className="hover:text-primary">
                        <span className="sr-only">View</span>
                        <PreviewIcon />
                    </button> */}
                    <button
                        className="hover:text-primary"
                        onClick={() => handleEdit(item)} // Call edit function with category data
                    >
                        <span className="sr-only">Edit</span>
                        <EditIcon />
                    </button>
                    <button
                        className="hover:text-primary"
                        onClick={() => handleDelete(item)} // Pass the category ID to delete function
                    >
                        <span className="sr-only">Delete</span>
                        <TrashIcon />
                    </button>
                    <button className="hover:text-primary">
                        <span className="sr-only">Download</span>
                        <DownloadIcon />
                    </button>
                </div>
            ),
        },
    ];

export default getColumns;
