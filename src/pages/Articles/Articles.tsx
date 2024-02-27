import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Article from "../../components/Article/Article";
import { ArticeProps } from "./type";

import "./Articles.scss";

const mockData = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
  urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
  massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
  tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
  ligula suscipit in. Nam laoreet odio mi, nec porta mauris rhoncus eu.
  Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
  placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
  faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
  bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
  risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
  semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.Nam laoreet odio mi, nec porta mauris rhoncus eu.
  Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
  placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
  faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
  bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
  risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
  semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.`,
  title: "Cookies",
  author: "Suzane Boyd",
  category: "Slatko",
  image:
    "https://juliemarieeats.com/wp-content/uploads/2023/01/Bakery-Style-Chocolate-Chip-Cookies-14-scaled.jpg",
};

// export default function ({ articles }: ArticeProps) {
export default function () {
  return (
    <Container>
      <Row>
        <Col xl="7" lg="12">
          {[1, 2, 3, 4, 5].map((idx) => (
            <Article {...mockData} key={idx} />
          ))}
        </Col>
        <Col xl="5" lg="12">
          Hello World
        </Col>
      </Row>
    </Container>
  );
}
