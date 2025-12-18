import { updateUnversionedDeps } from '@goatjs/dbz/update';

const run = async () => {
  await updateUnversionedDeps({
    react: 'canary',
    'react-dom': 'canary',
  });
};

void run();
