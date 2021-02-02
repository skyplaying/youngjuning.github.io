import React from 'react';
import { List, Card } from 'antd';
import Icon, { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import sortBy from 'lodash.sortby';

type DataI = Array<{
  npm: string;
  title: string;
  github: string;
  description: string;
  homepage?: string;
}>;

interface Props {
  data: DataI;
}
export default (props: Props) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 3,
      }}
      dataSource={sortBy(props.data, 'title')}
      renderItem={item => {
        return (
          <List.Item>
            <Card
              hoverable
              title={item.title}
              extra={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {item.npm ? (
                    <Icon
                      style={{ marginRight: 4 }}
                      onClick={() =>
                        window.open(`https://www.npmjs.com/package/${item.npm}`)
                      }
                      component={() => (
                        <svg
                          className="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="1070"
                          width="18"
                          height="18"
                        >
                          <path
                            d="M117.149737 906.850263V117.160081h789.690182v789.690182z m148.521374-641.706667v492.533657h248.873374V367.843556h145.025293v389.906101h98.735321V265.143596z"
                            fill="#CB3837"
                            p-id="1071"
                          ></path>
                        </svg>
                      )}
                    />
                  ) : null}
                  {item.homepage ? (
                    <LinkOutlined
                      style={{ marginRight: 4 }}
                      onClick={() => window.open(item.homepage)}
                    />
                  ) : null}
                  {item.github ? (
                    <GithubOutlined
                      onClick={() =>
                        window.open(`https://github.com/${item.github}`)
                      }
                    />
                  ) : null}
                </div>
              }
            >
              {item.description}
            </Card>
          </List.Item>
        );
      }}
    />
  );
};
