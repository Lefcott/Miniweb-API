const githubToken = `${'d8058d9dc8995863192'}${'f85615527af3e7d52b75a'}`;

const dbRepourl = 'https://{{GITHUB_TOKEN}}@github.com/WeBuildWebZ/DB-Backup'.replace(
  '{{GITHUB_TOKEN}}',
  githubToken
);

export { dbRepourl };
