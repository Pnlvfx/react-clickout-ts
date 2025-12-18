import { reactConfigs } from '@goatjs/react-library-eslint';
import { defineConfig, globalIgnores } from '@eslint/config-helpers';

export default defineConfig([globalIgnores(['dist', '.yarn', 'coverage']), ...reactConfigs({ tsconfigRootDir: import.meta.dirname })]);
