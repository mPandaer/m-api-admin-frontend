module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    // 关闭未使用变量的规则
    '@typescript-eslint/no-unused-vars': 'off',
    // 关闭缺少 key 的规则
    'react/jsx-key': 'off',
  },
};
