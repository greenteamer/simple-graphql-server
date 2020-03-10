// import { IResolvers } from 'graphql-tools';
import { GraphQLResolverMap } from 'apollo-graphql';
import { IUser } from '../user/user-resolvers';

export interface IPost {
  id: string;
  title: string;
  description: string;
  user: IUser;
}

// type getterFunc<S, IGetterResult> = (arg: S) => IGetterResult;

// interface IFether<T> {
//   [key: string]: getterFunc<string, T>,
// }

const resolverMap: GraphQLResolverMap = {
  Query: {
    posts: (userId: string): IPost[] => {
      return [
        { id: '1', title: 'Post 1', description: 'Description 1', user: { id: '1', username: 'username' } },
        { id: '2', title: 'Post 2', description: 'Description 2', user: { id: '2', username: 'username' } },
        { id: '3', title: 'Post 3', description: 'Description 3', user: { id: '3', username: 'username' } },
      ];
    },
  },
  Post: {
    getUser: (): IUser => {
      return { id: '1', username: 'username' };
    }
  }
}

export default resolverMap;
