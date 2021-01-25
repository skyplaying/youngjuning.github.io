import React from 'react';
import { List } from 'antd';

type DataI = Array<{
  title: string;
  link: string;
}>;

interface Props {
  data: DataI;
}
export default (props: Props) => {
  return (
    <List
      bordered
      dataSource={props.data}
      renderItem={item => {
        return (
          <List.Item>
            <a href={`/#/blog/${item.link}`}>{item.title}</a>
          </List.Item>
        );
      }}
    />
  );
};
