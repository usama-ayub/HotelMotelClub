import { IResponse } from './response';

// remove this object when i will get proper category
export interface ICategoryData {
    id: string;
    name: string;
    description: string;
    isCollapse?: boolean;
    child: Array<ICategoryData>;
}
// remove this object when i will get proper category

export interface ICategory {
    categoryId: string;
    categoryName: string;
    description: string;
    isCollapse?: boolean;
    subcategory: Array<ISubCategory>;
}
export interface ISubCategory {
    subCategoryId: string;
    subCategoryName: string;
}
export type ICategoryResponse  = IResponse<Array<ICategory>>