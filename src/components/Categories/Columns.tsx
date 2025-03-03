import { DownloadIcon, PreviewIcon } from "../Tables/icons";
import { TrashIcon, EditIcon } from "@/assets/icons";

const getColumns = (
    handleDelete: (category: Category) => void,
    handleEdit: (category: Category) => void
): TableColumn<Category>[] => [
        { key: "name", header: "Name", align: "left" },
        { key: "slug", header: "Slug", align: "left" },
        { key: "description", header: "Description", align: "left" },
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
