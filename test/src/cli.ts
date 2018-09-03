import { exec, maybeBuild } from '@test/helpers/cmd';

describe('cli', async () => {
  beforeAll(maybeBuild);

  it('prints help dialog with -h flag', async () => {
    const result = await exec('node dist/index.js -h');
    expect(result).toContain('-h, --help');
    expect(result).toContain('-s, --silent');
    expect(result).toContain('-d, --debug');
    expect(result).toContain('-c, --config <path>');
    expect(result).toContain('-V, --version');
  });

  it('sets up sentry by default', done => {
    exec('node dist/index.js -c "test/config/opt-in.yml" --debug').then(
      result => {
        expect(result).toContain('Installing sentry');
        done();
      },
    );
  });

  it('opts out with config flag', done => {
    exec('node dist/index.js -c "test/config/opt-out.yml" --debug').then(
      result => {
        expect(result).not.toContain('Installing sentry');
        done();
      },
    );
  });
});
