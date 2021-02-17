import React from 'react';

export default (props: {start: string;end: string}) => {
  var dateStart: any = new Date(props.start);
  var dateEnd: any  = new Date(props.end);
  var difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
  return <span><code>{difValue}</code></span>
}
