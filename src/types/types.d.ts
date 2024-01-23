export interface IPropsRedux {
  children: React.ReactNode;
}

export interface IAction {
  type: string;
  payload: object | string | number | boolean;
}

export interface IPostCardProps {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface IPostCardsContainerProps {
  posts: IPostCardProps[] | undefined;
}

export interface IInitialState {
  data: null | IPostCardProps[];
}
