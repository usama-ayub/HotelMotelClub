export interface IProduct {
    id: string;
    name: string;
    description: string;
    imageArray?: Array<IProductImage>;
    price: number;
    phoneNumber: string;
    location: string;
    category: string;
    favorite:boolean;
  }

  export interface IProductImage {
    id: string;
    image_url: string;
    main: boolean,
  }