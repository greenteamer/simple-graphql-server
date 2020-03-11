import { GraphQLResolverMap } from 'apollo-graphql';
import data from './data';

export interface IUser {
  id: string;
  username?: string;
}

export interface IPost {
  id: string;
  title: string;
  description: string;
  userId: string;
}

export interface IReview {
  id: string;
  text: string;
  userId: string;
  postId: string;
}

// type getterFunc<S, IGetterResult> = (arg: S) => IGetterResult;

// interface IFether<T> {
//   [key: string]: getterFunc<string, T>,
// }

const resolverMap = {
  Query: {
    me: (): IUser => {
      return data.users[0];
    },
    user: (id: string): IUser | undefined => {
      return data.users.find((user: IUser) => user.id === id);
    },
    posts: (): IPost[] => {
      return data.posts;
    },
    reviews: (): IReview[] => {
      return data.reviews;
    },
  },
  Mutation: {
    addReview: (_: any, { review }: { review: IReview }): IReview[] => {
      console.log('>>> addReview: ', review);
      data.reviews.push(review);
      return data.reviews;
    },
  },
  User: {
    posts: (parent: IUser): IPost[] => {
      return data.posts.filter((post: IPost) => post.userId === parent.id);
    },
    reviews: (parent: IUser): IReview[] => {
      return data.reviews.filter((review: IReview) => review.userId === parent.id);
    },
  },
  Post: {
    user: (parent: IPost): IUser | undefined => {
      return data.users.find((user: IUser) => user.id === parent.userId);
    },
    reviews: (parent: IPost): IReview[] => {
      return data.reviews.filter((review: IReview) => review.postId === parent.id);
    }
  },
  Review: {
    user: (parent: IReview): IUser | undefined => {
      return data.users.find((user: IUser) => user.id === parent.userId);
    },
    post: (parent: IReview): IPost | undefined => {
      return data.posts.find((post: IPost) => post.id === parent.postId);
    }
  },
}

export default resolverMap;
