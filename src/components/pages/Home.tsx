import React, { useState } from "react";
import { Layout } from "antd";
import FooterMenu from "../organisms/FooterMenu";
import { MenuType } from "../../types";
import MainContent from "../organisms/MainContent";
import HeaderMenu from "../organisms/HeaderMenu";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const [selectedMenuKey, setSelectedMenuKey] = useState<MenuType>("player");

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header>
        <HeaderMenu />
      </Header>
      <Content style={{ minHeight: 280, overflowY: "auto" }}>
        <MainContent selectedMenuKey={selectedMenuKey} />
      </Content>
      <Footer style={{ padding: "0" }}>
        <FooterMenu
          onClick={({ key }) =>
            setSelectedMenuKey(key as "player" | "pairing" | "match")
          }
        />
      </Footer>
    </Layout>
  );
};

export default Home;
