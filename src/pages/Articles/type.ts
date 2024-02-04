export type Article = {
  title: string;
  description: string;
  author: string;
  image: string;
};

export type ArticeProps = {
  articles: Article[];
};
