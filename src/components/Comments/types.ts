export type Comment = {
  id: number;
  text: string;
  firstName: string;
  lastName: string;
  timestamp: string;
  verified: boolean | null;
};

export type CommentsProps = {
  id: number;
  comments: Comment[];
  isLoading: boolean;
  onPostComment: (
    comment: Omit<Comment, "timestamp" | "id" | "verified"> & {
      articleId: number;
      userId: number | null;
    }
  ) => void;
};
