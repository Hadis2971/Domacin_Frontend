import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ClipLoader from "react-spinners/ClipLoader";

import SecondaryArticle from "../../components/Article/components/SecondaryArticle/SecondaryArticle";
import Article from "../../components/Article/Article";
import { useGetArticlesBasedOnCategory } from "../../http/useArticle";
import { Article as ArticleType } from "./type";

import "./ArticlesCategory.scss";

export default function () {
  const { data: articles, isLoading: isLoadingArticles } =
    useGetArticlesBasedOnCategory();

  return (
    <Container>
      {isLoadingArticles ? (
        <div className="articles-list-loading-container">
          <ClipLoader
            color={"#e91e63"}
            loading={isLoadingArticles}
            size={250}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h2>Ucitavam...</h2>
        </div>
      ) : (
        <Row>
          <Col xl="7" lg="12">
            {articles.map((article: ArticleType, idx: number) => (
              <Article {...article} key={article.id} />
            ))}

            <div className="secondary-articles-container">
              {articles.map((article: ArticleType, idx: number) => (
                <SecondaryArticle {...article} key={article.id} />
              ))}
            </div>
          </Col>

          <Col xl="5" lg="12">
            Hello World
          </Col>
        </Row>
      )}
    </Container>
  );
}
