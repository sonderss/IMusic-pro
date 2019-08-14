export default {
   history:'hash',
    plugins: [
      // 有参数
      [
        'umi-plugin-react',
        {
          dva: true,
          antd: true, // 可以同时使用antd和antd-mobile
        },
      ],
      //'./plugin', 需要删除，否则报错
    ]
  };
