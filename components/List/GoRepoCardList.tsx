import React from 'react';
import { List, Card } from 'antd';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import sortBy from 'lodash.sortby';

type DataI = Array<{
  homepage?: string;
  title: string;
  github: string;
  description: string;
}>;

interface Props {
  data: DataI;
}
export default (props: Props) => {
  return (
    <List
      grid={{
        gutter: 16,
        column: 3,
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
