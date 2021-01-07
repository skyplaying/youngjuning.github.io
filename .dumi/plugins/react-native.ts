import { IApi } from 'dumi';
// inspired by https://github.com/doczjs/docz/pull/271/files
export default (api: IApi) => {
  api.modifyConfig(memo => {
    return {
      ...memo,
      alias: {
        'react-native': 'react-native-web',
      },
    };
  });
};
