export interface ICategory {
    id: string;
    name: string;
    description: string;
    isCollapse?: boolean;
    child: Array<ICategory>;
}