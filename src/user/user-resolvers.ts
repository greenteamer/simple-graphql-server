// import { IResolvers } from 'graphql-tools';
import { GraphQLResolverMap } from 'apollo-graphql';

export interface IUser {
  id: string;
  username?: string;
}

type getterFunc<S, IGetterResult> = (arg: S) => IGetterResult;

interface IFether<T> {
  [key: string]: getterFunc<string, T>,
}

const resolverMap: GraphQLResolverMap = {
  Query: {
    me: (): IUser => {
      return { id: '1', username: 'Machalkin1' };
    },
    user: (id: string): IUser => {
      console.log('>> id: ', id);
      return { id: '2', username: 'Machalkin2' };
    }
  },
  User: {
    // __resolveReference: (user: IUser, { fetchUserById }: IFether<IUser>) => {
    //   return fetchUserById(user.id);
    // }
    // getPosts: ()
  }
}

export default resolverMap;
