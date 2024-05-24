import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Article, ArticleComment } from "../pages/Articles/type";
import { useAuthUser } from "./useAuth";

type usePostArticleCommentReqType = {
  articleId: number;
  firstName: string;
  lastName: string;
  userId: number | null;
  text: string;
};

export const useGetArticles = () => {
  const queryFn = async () => {
    const response = await axios.get("http://127.0.0.1:5000/articles/");

    return response.data;
  };

  return useQuery({
    queryFn,
    queryKey: ["articles"],
    onError: (error: AxiosError) => {
      console.log(error);
      const errorMsg = (error.response?.data ||
        "Greska Preuzimanja Clanaka") as String;

      toast.error(errorMsg);
    },
  });
};

export const useGetArticlesBasedOnCategory = () => {
  const { category } = useParams();

  const queryFn = async () => {
    const res = await axios.get(
      `http://127.0.0.1:5000/articles/${category?.slice(1)}`
    );

    return res.data;
  };

  const query = useQuery({
    queryFn,
    queryKey: ["articles", category],
    onError: (error: AxiosError) => {
      console.log(error);
      const errorMsg = (error.response?.data ||
        "Greska Preuzimanja Clanaka") as String;

      toast.error(errorMsg);
    },
  });

  return query;
};

export const usePostArticleComment = () => {
  const queryClient = useQueryClient();
  const { data: user } = useAuthUser();

  const mutationFn = (comment: usePostArticleCommentReqType) =>
    axios.post("http://127.0.0.1:5000/articles/comment", comment);

  return useMutation({
    mutationFn,
    onSuccess: (response, variables) => {
      const articles = queryClient.getQueryData(["articles"]) as Article[];

      const comment = {
        id: variables.articleId,
        firstName: variables.firstName,
        lastName: variables.lastName,
        text: variables.text,
        timestamp: new Date().toLocaleDateString(),
        verified: !!user,
      } as ArticleComment;

      const updatedArticles = articles.map((article) => {
        if (article.id === variables.articleId)
          return { ...article, comments: [...article.comments, comment] };
        else return article;
      });

      queryClient.setQueryData(["articles"], updatedArticles);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      const errorMsg = (error.response?.data ||
        "Greska Komentarisanja Clanka") as String;

      toast.error(errorMsg);
    },
  });
};
