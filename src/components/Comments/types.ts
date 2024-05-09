import { ArticleComment } from "../Article/types";

export type Comment = {
  id: number;
  text: string;
  firstName: string;
  lastName: string;
  timestamp: string;
};

export type CommentsProps = {
  id: number;
  comments: Comment[];
  isLoading: boolean;
  onPostComment: (
    comment: Omit<Comment, "timestamp" | "id"> & {
      articleId: number;
      userId: number | null;
    }
  ) => void;
};
