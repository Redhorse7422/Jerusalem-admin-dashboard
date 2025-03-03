import { cn } from "@/lib/utils";
import { PlusIcon } from "@/assets/icons";
import { PaginatedTable } from "../Tables/PaginatedTable";
import getColumns from "./Columns";
import { Button } from "@/components/ui-elements/button";
import { useState } from "react";
import { Modal } from "../ui-elements/Modal";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputGroup from "../FormElements/InputGroup";
import { TextAreaGroup } from "../FormElements/InputGroup/text-area";

interface CategoriesTableProps {
  className?: string;
  categories: Category[];
  onCreateCategory: (formData: { name: string; description: string }) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateCategory: (id: string, formData: { name: string; description: string }) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});

type FormData = {
  name: string;
  description: string;
};

export function CategoriesTable({ className, categories, onCreateCategory, onDeleteCategory, onUpdateCategory }: CategoriesTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (selectedCategory) {
      onUpdateCategory(selectedCategory.id, data);
      setIsEditModalOpen(false);
    } else {
      onCreateCategory(data);
      setIsModalOpen(false);
    }
    reset();
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      onDeleteCategory(selectedCategory.id);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setValue("name", category.name);
    setValue("description", category.description);
    setIsEditModalOpen(true);
  };

  const columns = getColumns(handleDeleteClick, handleEditClick);

  return (
    <div className={cn("grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Categories</h2>
        <Button label="Add" variant="primary" shape="rounded" size="small" icon={<PlusIcon width={14} height={14} />} onClick={() => setIsModalOpen(true)} />
      </div>

      <PaginatedTable data={categories} columns={columns} />

      {(isModalOpen || isEditModalOpen) && (
        <Modal onClose={() => { setIsModalOpen(false); setIsEditModalOpen(false); reset(); }} title={isEditModalOpen ? "Edit Category" : "Add Category"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup label="Name" type="text" placeholder="Enter category name" className="w-full mb-4.5" {...register('name')} error={errors.name?.message} />
            <TextAreaGroup
              label="Description"
              placeholder="Enter category description"
              register={register("description", { required: "Description is required" })}
              error={errors.description?.message}
            />
            <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">{isEditModalOpen ? "Update" : "Submit"}</button>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
          <p>Are you sure you want to delete this category?</p>
          <div className="flex justify-end mt-4">
            <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={confirmDelete}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
