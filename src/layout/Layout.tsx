import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CheckoutModal from "./components/CheckoutModal/CheckoutModal";
import useGetIsCurrentRoute from "../hooks/useGetIsCurrentRoute";

import useWebsockets from "../http/useWebsockets";
import { ProductsContext } from "../state/Products";

import "./Layout.scss";

const MainContentContainer = styled.div<{
  $isHomePage?: boolean;
  $isAuthPage?: boolean;
}>`
  margin: ${(props) => (props.$isHomePage ? "0px auto" : "-5% auto 0px auto")};
  width: 98%;
  height: ${(props) => (props.$isAuthPage ? "100vh" : "100%")};
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f2f2f2;
`;

const getPageHeadingTitle = (
  pathname: string,
  category: string | undefined
): string | null => {
  switch (pathname) {
    case "/shop":
    case `/shop/${category}`:
      return "Shop";

    case "/articles":
    case `/articles/${category}`:
      return "Clanci";

    case "/auth":
      return "Prijava";

    default:
      return null;
  }
};

export default function () {
  useWebsockets();
  const { pathname } = useLocation();
  const value = useContext(ProductsContext);
  const { category } = useParams();

  const headingTitle = getPageHeadingTitle(pathname, category);
  const isHomePage = useGetIsCurrentRoute("/");
  const isAuthPage = useGetIsCurrentRoute("/auth");

  return (
    <Container id="Layout" fluid className="p-0 m-0">
      <Row className="sticky-top">
        <Navbar />
      </Row>

      {headingTitle && (
        <Row id="jumbotron">
          <h1>{headingTitle}</h1>
        </Row>
      )}

      <MainContentContainer $isHomePage={isHomePage} $isAuthPage={isAuthPage}>
        <Row id="main-content">
          <Outlet />
        </Row>
      </MainContentContainer>

      <Row>
        <Footer />
      </Row>

      {value?.displayCheckoutModal && <CheckoutModal />}
    </Container>
  );
}
