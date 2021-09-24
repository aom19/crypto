import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosNewsQuery } from "../../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImg =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  //get news
  const { data: cryptosNews } = useGetCryptosNewsQuery({
    newsCategory,
    //numvber of news on display 6 on simplified components else 12 
    count: simplified ? 6 : 12,
  });
  //get currencies name
  const { data } = useGetCryptosQuery(100);
  // console.log(cryptosNews);
  if (!cryptosNews?.value) return "Loading ...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLoweCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}> {coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptosNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImg}
                  alt="news"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl || demoImg
                    }
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>{moment(news.datePublised).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
