import { updateLocalDeps } from '@goatjs/updater';

const run = async () => {
  await updateLocalDeps({
    react: 'canary',
    'react-dom': 'canary',
    'eslint-plugin-react-hooks': 'canary',
    '@goatjs/rimraf': 'github:Pnlvfx/goatjs#workspace=@goatjs/rimraf',
    '@goatjs/updater': 'github:Pnlvfx/goatjs#workspace=@goatjs/updater',
  });
};

void run();
