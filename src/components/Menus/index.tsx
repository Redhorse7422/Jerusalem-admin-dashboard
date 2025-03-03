import { cn } from "@/lib/utils";
import { PlusIcon } from "@/assets/icons";
import { PaginatedTable } from "../Tables/PaginatedTable";
import getColumns from "./Columns";
import { Button } from "@/components/ui-elements/button";
import { useEffect, useState } from "react";
import { Modal } from "../ui-elements/Modal";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputGroup from "../FormElements/InputGroup";
import { TextAreaGroup } from "../FormElements/InputGroup/text-area";
import { Select } from "../FormElements/select";
import { useGetAllCategoriesQuery } from "@/store/features/categories/categoriesApi";
import FileUploader from "../FormElements/fileUploader";

interface MenusTableProps {
  className?: string;
  menus: Menu[];
  onCreateMenu: (formData: { name: string; description: string }) => void;
  onDeleteMenu: (menuId: string) => void;
  onUpdateMenu: (id: string, formData: { name: string; description: string }) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.string().required('Price is required'),
  description: yup.string().required('Description is required'),
  icon: yup
    .mixed<File | string>()
    .required('Image is required') // Ensure it's required
    .test('fileType', 'Image is required', (value) => {
      return typeof value === 'string' || (value instanceof File && value.size > 0);
    }),
  category_id: yup.string().required('Category is required'),
  gallery: yup.array().of(yup.mixed<File | string>().required()).optional(),
});

type FormData = {
  name: string;
  price: string;
  description: string;
  icon: File | string;
  category_id: string;
  gallery?: (File | string)[];
};

export function MenusTable({ className, menus, onCreateMenu, onDeleteMenu, onUpdateMenu }: MenusTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Menu | null>(null);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);

  const { data, isLoading } = useGetAllCategoriesQuery({});

  useEffect(() => {
    if (data?.data?.categories) {
      setCategories(
        data.data.categories.map((item: any) => ({
          label: item.name,
          value: item.id, // Ensure this is a string or number
        }))
      );
    }
  }, [data]);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const readFileAsBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            reject(new Error("Failed to read file as Base64"));
          }
        };
        reader.onerror = () => {
          reject(new Error("Error reading file"));
        };
      });
    };

    try {
      // Convert the icon to Base64
      const base64Icon = data.icon instanceof File ? await readFileAsBase64(data.icon) : data.icon;

      // Convert all gallery images to Base64 and wrap them inside { url: base64String }
      const galleryBase64 = data.gallery
        ? await Promise.all(
          data.gallery.map(async (file) =>
            file instanceof File ? { url: await readFileAsBase64(file) } : file
          )
        )
        : [];

      // Construct the final payload
      const formData = {
        category_id: data.category_id,
        name: data.name,
        description: data.description,
        price: data.price,
        thumbnail: base64Icon,
        gallery_images: galleryBase64,
        discounted_price: 0
      };

      if (selectedCategory) {
        onUpdateMenu(selectedCategory.id, formData);
        setIsEditModalOpen(false);
      } else {
        onCreateMenu(formData);
        setIsModalOpen(false);
      }

      reset();
    } catch (error) {
      console.error("Error converting files to Base64:", error);
    }
  };


  const handleDeleteClick = (category: Menu) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      onDeleteMenu(selectedCategory.id);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleEditClick = (category: Menu) => {
    setSelectedCategory(category);

    // Pre-populate all form fields
    setValue("name", category.name);
    setValue("price", category.price); // Assuming `price` is a field in `category`
    setValue("description", category.description);
    setValue("category_id", category.category_id); // Assuming `category_id` is a field in `category`

    // Handle the icon field
    if (category.thumbnail) {
      setValue("icon", category.thumbnail); // Assuming `icon` is a Base64 string or File
    }

    setIsEditModalOpen(true);
  };

  const handleFileChange = (files: File | File[] | null) => {
    if (Array.isArray(files)) {
      // Handle multiple files
      setValue('gallery', files ? (Array.isArray(files) ? files : [files]) : [])
    } else {
      // Handle single file
      setValue('icon', files || '')
    }
  };

  const columns = getColumns(handleDeleteClick, handleEditClick);

  return (
    <div className={cn("grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Menus</h2>
        <Button label="Add" variant="primary" shape="rounded" size="small" icon={<PlusIcon width={14} height={14} />} onClick={() => setIsModalOpen(true)} />
      </div>

      <PaginatedTable data={menus} columns={columns} />

      {(isModalOpen || isEditModalOpen) && (
        <Modal onClose={() => { setIsModalOpen(false); setIsEditModalOpen(false); reset(); }} title={isEditModalOpen ? "Edit Menu" : "Add Menu"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FileUploader
              multiple={false}
              label="Thumbnail"
              required
              onChange={handleFileChange}
              error={errors.icon?.message}
            />


            {/* Display existing image if in edit mode */}
            {isEditModalOpen && selectedCategory?.thumbnail && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Current Image:</p>
                <img
                  src={selectedCategory.thumbnail}
                  alt="Current Menu Icon"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            )}

            <InputGroup label="Name" type="text" placeholder="Enter menu name" className="w-full mb-4" {...register('name')} error={errors.name?.message} />
            <InputGroup label="Price" type="text" placeholder="Enter price" className="w-full mb-4" {...register('price')} error={errors.price?.message} />
            <TextAreaGroup
              label="Description"
              placeholder="Enter category description"
              register={register("description", { required: "Description is required" })}
              error={errors.description?.message}
              className="w-full mb-4"
            />
            <Select
              label="Select Category"
              items={categories}
              defaultValue={categories.length > 0 ? categories[0]?.value : undefined}
              placeholder="Choose a category"
              onChange={(value) => setValue('category_id', value)}
              error={errors.category_id?.message}
            />

            <FileUploader
              multiple={true}
              label="Gallery"
              // onChange={(files) => console.log(files)}
              onChange={handleFileChange}
            // onChange={(files) => setValue('gallery', files ? (Array.isArray(files) ? files : [files]) : [])}
            />

            <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">{isEditModalOpen ? "Update" : "Submit"}</button>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
          <p>Are you sure you want to delete this menu?</p>
          <div className="flex justify-end mt-4">
            <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={confirmDelete}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
