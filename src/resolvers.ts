import { GraphQLResolverMap } from "apollo-graphql";
import data from "./data";

export interface IUser {
  id: string;
  name?: string;
}

export interface INewUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
}

export interface ISingInInput {
  email: string;
  password: string;
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
    // {
    //   users {
    //     name
    //   }
    // }
    users(_: any, __: any, { models }: { models: any }): INewUser[] {
      console.log(models.User);
      return models.User.findAll();
    },
    posts: (): IPost[] => {
      return data.posts;
    },
    reviews: (): IReview[] => {
      return data.reviews;
    },
    post: (_: any, { id }: { id: string }): IPost | undefined => {
      console.log(">>> id: ", id);
      return data.posts.find((post: IPost) => post.id === id);
    }
  },
  Mutation: {
    // mutation addUser {
    //   addUser(user: {email: "jane@example.com", name: "Nick", password: "111"}){
    //     name
    //     email
    //     password
    //   }
    // }
    signInUser: async (
      _: any,
      { signInInput }: { signInInput: ISingInInput },
      { models }: { models: any }
    ): Promise<INewUser> => {
      const { email, password } = signInInput;
      await models.User.update(
        { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" },
        {
          where: {
            email,
            password
          },
          returning: true
        }
      );
      const user = await models.User.findOne({ where: { email } });
      return user.dataValues;
    },
    addUser: async (
      _: any,
      { user }: { user: INewUser },
      { models }: { models: any }
    ): Promise<INewUser> => {
      await models.User.create(user);
      return user;
    },
    addReview: (_: any, { review }: { review: IReview }): IUser => {
      console.log(">>> addReview: ", review);
      data.reviews.push(review);
      return data.users[0];
    }
  },
  User: {
    posts: (parent: IUser): IPost[] => {
      return data.posts.filter((post: IPost) => post.userId === parent.id);
    },
    reviews: (parent: IUser): IReview[] => {
      return data.reviews.filter(
        (review: IReview) => review.userId === parent.id
      );
    }
  },
  Post: {
    user: (parent: IPost): IUser | undefined => {
      return data.users.find((user: IUser) => user.id === parent.userId);
    },
    reviews: (parent: IPost): IReview[] => {
      return data.reviews.filter(
        (review: IReview) => review.postId === parent.id
      );
    }
  },
  Review: {
    user: (parent: IReview): IUser | undefined => {
      return data.users.find((user: IUser) => user.id === parent.userId);
    },
    post: (parent: IReview): IPost | undefined => {
      return data.posts.find((post: IPost) => post.id === parent.postId);
    }
  }
};

export default resolverMap;
