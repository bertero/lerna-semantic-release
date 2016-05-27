var commitAnalyzer = require('@semantic-release/commit-analyzer');

module.exports = {
  default: function (_ref, cb) {
    var pkg = _ref.pkg;
    var commits = _ref.commits;

    var relevantCommits = commits.filter(function (commit) {
      var affectsLine = commit.message.split('\n\n')[1];
      return module.exports.isRelevant(affectsLine, pkg.name);
    });

    commitAnalyzer({}, Object.assign(_ref, {commits: relevantCommits}), function (err, type) {
      console.log('Anaylzed', relevantCommits.length, 'commits to determine type', type, 'for', pkg.name);
      cb(err, type);
    });
  },

  isRelevant: function (commitBody, packageName) {
    return commitBody && commitBody.indexOf('affects:') === 0 && packageName.indexOf(packageName) > -1
  }
};