// @ts-check

import { escapace, compose } from 'eslint-config-escapace'

export default compose(
  escapace({
    typescript: {
      rules: {
        'typescript/no-empty-object-type': 'off',
      },
    },
  }),
  {
    files: ['src/types.ts'],
    rules: {
      'typescript/no-unused-vars': 'off',
    },
  },
)
