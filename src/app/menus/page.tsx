"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MenusTable } from "@/components/Menus";
import { MenusSkeleton } from "@/components/Menus/skeleton";
import { useCreateMenuMutation, useDeleteMenuMutation, useGetAllMenusQuery, useUpdateMenuMutation } from "@/store/features/menus/menusApi";
import { useState, useEffect } from "react";

const MenusPage = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const { data, isLoading } = useGetAllMenusQuery({});
    const [createMenu] = useCreateMenuMutation();
    const [deleteMenu] = useDeleteMenuMutation();
    const [updateMenu] = useUpdateMenuMutation();

    useEffect(() => {
        if (data?.data) {
            setMenus(data.data);
        }
    }, [data]);

    // Function to create a new category
    const handleCreateMenu = async (formData: { name: string; description: string }) => {
        try {
            const response = await createMenu(formData).unwrap(); // API call
            setMenus([...menus, response.data]);
        } catch (error) {
            console.error("Error creating Menu:", error);
        }
    };

    // Function to delete a category
    const handleDeleteMenu = async (menuId: string) => {
        try {
            await deleteMenu(menuId).unwrap();
            setMenus(menus.filter(menu => menu.id !== menuId));
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };

    // Function to update a category
    const handleUpdateMenu = async (id: string, updatedData: { name: string; description: string }) => {
        try {
            const response = await updateMenu({ 'id': id, ...updatedData }).unwrap(); // API call
            setMenus((prevMenus) => prevMenus.map(menu => menu.id === id ? response.data : menu));
        } catch (error) {
            console.error("Error updating Menu:", error);
        }
    };


    return (
        <>
            <Breadcrumb pageName="Menus" />
            {isLoading ? (
                <MenusSkeleton />
            ) : (
                <MenusTable
                    menus={menus}
                    onCreateMenu={handleCreateMenu}
                    onDeleteMenu={handleDeleteMenu}
                    onUpdateMenu={handleUpdateMenu}
                />
            )}
        </>
    );
};

export default MenusPage;
