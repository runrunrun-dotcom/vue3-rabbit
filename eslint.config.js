import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // skipFormatting,
  eslintPluginPrettierRecommended
])
