import React, { createContext, useState, useContext } from "react";

export interface CategoryType {
  name: string;
  iconUrl?: string;
  sub?: { name: string; iconUrl: string; src: string }[];
}

const CategoryContext = createContext<{
  currentCategory: CategoryType | null;
  setCurrentCategory: (cat: CategoryType | null) => void;
}>({
  currentCategory: null,
  setCurrentCategory: () => {},
});

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);

  return (
    <CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
