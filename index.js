/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

module.exports = (app) => {
  // Your code here
  app.log('Yay, the app was loaded!');

  app.on('issues.opened', async (context) => {
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;

    // app.log(context.github.issues.listForRepo({
    //   owner,
    //   repo
    // }));

    context.github.issues
      .listForRepo({
        owner,
        repo,
      })
      .then((data) => {
        app.log(data);
      })
      .catch((err) => {
        app.log('Error: ', err);
      });

    const issueComment = context.issue({
      body: 'Thanks for opening this issue!',
    });

    return context.github.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
