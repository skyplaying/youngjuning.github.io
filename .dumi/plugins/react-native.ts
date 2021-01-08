import { IApi } from 'umi';

export default (api: IApi) => {
  api.describe({
    key: 'reactNative',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.modifyConfig(memo => {
    return {
      ...memo,
      alias: {
        ...memo.alias,
        'react-native': 'react-native-web',
      },
    };
  });
};
