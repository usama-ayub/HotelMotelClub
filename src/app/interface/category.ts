import { IResponse } from './response';


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