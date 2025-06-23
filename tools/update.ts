/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */
import { updateLocalDeps } from '@goatjs/updater';

const run = async () => {
  try {
    await updateLocalDeps({
      react: 'canary',
      'react-dom': 'canary',
      'eslint-plugin-react-hooks': 'canary',
      '@goatjs/rimraf': 'github:Pnlvfx/goatjs#workspace=@goatjs/rimraf',
      '@goatjs/updater': 'github:Pnlvfx/goatjs#workspace=@goatjs/updater',
    });
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

void run();
