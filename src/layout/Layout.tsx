import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import useGetIsCurrentRoute from "../hooks/useGetIsCurrentRoute";

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

const getPageHeadingTitle = (pathname: string): string | null => {
  switch (pathname) {
    case "/shop":
      return "Shop";
    case "/articles":
      return "Clanci";
    case "/auth":
      return "Prijava";

    default:
      return null;
  }
};

export default function () {
  const { pathname } = useLocation();

  const headingTitle = getPageHeadingTitle(pathname);
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
    </Container>
  );
}
