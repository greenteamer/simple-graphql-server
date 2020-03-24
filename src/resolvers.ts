import { GraphQLResolverMap } from "apollo-graphql";
import data from "./data";
import { getRepository } from "typeorm";
import { User } from "./models";
import { getJWTToken } from "./utils/token";

export interface IUser {
  id: string;
  name?: string;
}

export interface IAddUserInput {
  name: string;
  email: string;
  password: string;
}

// export interface INewUser {
//   id?: string;
//   name: string;
//   email: string;
//   token?: string;
// }

export type INewUser = Omit<User, 'password'>;

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


const resolverMap = {
  Query: {
    me: (): IUser => {
      return data.users[0];
    },
    user: (id: string): IUser | undefined => {
      return data.users.find((user: IUser) => user.id === id);
    },
    users: async (): Promise<User[]> => {
      const allUsers = await getRepository(User).find();
      return allUsers;
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
    signInUser: async (
      _: any,
      { signInInput }: { signInInput: ISingInInput },
    ): Promise<INewUser | null> => {
      const { email, password } = signInInput;
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({
        select: ['id', 'email', 'name', 'token'],
        where: { email, password },
      });
      if (!user) return null;
      const token = getJWTToken(email, password);
      user.token = token;
      userRepo.save(user);
      return user;
    },
    addUser: async (
      _: any,
      { user: userInput }: { user: IAddUserInput },
    ): Promise<INewUser> => {
      const token = getJWTToken(userInput.email, userInput.password);
      const userRepo = getRepository(User);
      const user = userRepo.create({ ...userInput, token });
      const result = await userRepo.save(user);
      const { password, ...safeUser } = result;
      return safeUser;
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
