export interface ICategory {
    id: string;
    name: string;
    description: string;
    child: Array<ICategory>;
}