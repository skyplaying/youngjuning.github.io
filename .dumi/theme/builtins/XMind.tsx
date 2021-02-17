import React from 'react';

export default (props: {id: string}) => {
  return <iframe src={`https://www.xmind.net/embed/${props.id}`} width="900px" height="540px"></iframe>
}
