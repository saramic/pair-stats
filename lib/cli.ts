import * as gitlog from "gitlog";
import * as _ from "lodash";

type PairInfoCommit = {
  authorEmail: string;
  rawBody: string;
};

const cli = (args: [string]) => {
  const options = {
    fields: ["authorEmail", "rawBody"],
    repo: args[0] || ".",
  };
  const commits: PairInfoCommit[] = gitlog(options);
  const authors = _.uniq(
    _.map(commits, (commit: PairInfoCommit) => commit.authorEmail),
  );

  if (authors.length === 0) { return "No commit authors found here"; }
  if (authors.length === 1) {
    return `Nice work on your solo project "${authors[0]}", go find a pair`;
  }
  if (authors.length > 1) {
    return "Great work, try woring together as a pair with a Co-authored-by: commit";
  }
};

export { cli, PairInfoCommit };
