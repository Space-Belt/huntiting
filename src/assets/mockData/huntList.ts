export interface IHuntList {
  id: number;
  productName: string;
  productCount: number;
  price: string;
  created_at: string;
  productPhotoUrl: string[];
  status?: 'successed' | 'pending' | 'failed';
}

export const huntList: IHuntList[] = [
  {
    id: 1,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'pending',
  },
  {
    id: 2,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'failed',
  },
  {
    id: 3,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'successed',
  },
  {
    id: 4,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'pending',
  },
  {
    id: 5,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'pending',
  },
  {
    id: 6,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'successed',
  },
  {
    id: 7,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'failed',
  },
  {
    id: 8,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'pending',
  },
  {
    id: 9,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'success',
  },
  {
    id: 10,
    productName: '1번 상품',
    productCount: 1000,
    price: '100000',
    created_at: '2024/05/11',
    productPhotoUrl: ['https://picsum.photos/200'],
    status: 'pending',
  },
];
