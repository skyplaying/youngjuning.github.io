import React from 'react';
import { List } from 'antd';

type DataI = Array<{
  title: string;
  link?: string;
  outlink?: string;
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
            <a
              href={item.outlink ? item.outlink : `/#/blog/${item.link}`}
              target={item.outlink ? '_blank' : '_self'}
            >
              {item.title}
            </a>
          </List.Item>
        );
      }}
    />
  );
};
