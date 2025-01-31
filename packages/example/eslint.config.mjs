// @ts-check

import { escapace, compose } from 'eslint-config-escapace'

export default compose(
  escapace({
    vue: { enabled: true, rules: { 'vue/first-attribute-linebreak': 'off' } },
  }),
)
