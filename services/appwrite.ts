// track the searches made by the user
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const MOVIES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        },
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie?.id,
        count: 1,
        title: movie?.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveMovie = async ({
  userId,
  movieId,
  title,
  poster,
}: SaveMovie) => {
  return database.createDocument(
    DATABASE_ID,
    MOVIES_COLLECTION_ID,
    "unique()",
    {
      userId,
      movieId,
      title,
      poster,
    },
  );
};

export const removeMovie = async (docId: string) => {
  return database.deleteDocument(DATABASE_ID, MOVIES_COLLECTION_ID, docId);
};

export const getSavedMovie = async (userId: string, movieId: number) => {
  const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("userId", userId),
    Query.equal("movieId", movieId),
  ]);

  return res.documents[0] || null;
};
