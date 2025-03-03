interface TableColumn<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    align?: "left" | "center" | "right";
}

interface TableProps<T> {
    className?: string;
    data: T[];
    columns: TableColumn<T>[];
    itemsPerPage?: number;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
}

interface Menu {
    id: string;
    name: string;
    slug: string;
    description: string;
    thumbnail: string;
    price: string;
    category_id: string;
    gallery_images?: GalleryImage[];
}

interface GalleryImage {
    url: string;
}
