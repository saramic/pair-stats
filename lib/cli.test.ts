import { cli, PairInfoCommit } from "./cli";

let gitLogs: PairInfoCommit[] = [];
jest.mock("gitlog", () => () => gitLogs);

describe("git log is called with correct options", () => {
  it("by default current directory for repo", () => {
    cli(["."]);
    pending("cannot inspect what gitlog is called with?");
    expect(gitLogs).toHaveBeenCalledWith({
      fields: ["authorEmail", "rawBody"],
      repo: ".",
    });
  });
});

describe("An empty git log", () => {
  beforeAll(() => {
    // gitLogs = [];
    jest.mock("gitlog", () => () => []);
  });
  afterAll(() => {
    jest.unmock("gitlog");
  });
  it("Has no logs", () => {
    expect(cli(["."])).toEqual("No commit authors found here");
  });
});

describe("A single author git log", () => {
  beforeAll(() => {
    gitLogs = [
      {
        authorEmail: "user1@example.org",
        rawBody: "",
      },
    ];
    jest.mock("gitlog", () => () => gitLogs);
  });

  it("Encourages the user to get a pair", () => {
    expect(cli(["."])).toEqual(
      'Nice work on your solo project "user1@example.org", go find a pair',
    );
  });
});

describe("A multi author git log", () => {
  beforeAll(() => {
    gitLogs = [
      {
        authorEmail: "user1@example.org",
        rawBody: "",
      },
      {
        authorEmail: "user2@example.org",
        rawBody: "",
      },
    ];
    jest.mock("gitlog", () => () => gitLogs);
  });

  it("Encourages the user to get a pair", () => {
    expect(cli(["."])).toEqual(
      "Great work, try woring together as a pair with a Co-authored-by: commit",
    );
  });
});

describe("A multi author git log with Co-authored-by commits", () => {
  beforeAll(() => {
    gitLogs = [
      {
        authorEmail: "user1@example.org",
        rawBody: "Co-authored-by: user2@example.org",
      },
      {
        authorEmail: "user2@example.org",
        rawBody: "Co-authored-by: user3@example.org",
      },
    ];
    jest.mock("gitlog", () => () => gitLogs);
  });

  it("Encourages the user to get a pair", () => {
    pending("make this actually do something");
    expect(cli(["."])).toEqual(
      "Pair stats are:\n" +
        "                  | user1@example.org | user2@example.org | user3@example.org |\n" +
        "user1@example.org |                 - |                 1 |                 - |\n" +
        "user2@example.org |                 - |                 - |                 1 |\n" +
        "user3@example.org |                 _ |                 - |                 - |\n",
    );
  });
});
