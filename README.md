# pair-stats

**pair-stats** is a pairing statistics scripts to help your team pair fairly.
It analyses the git log of a project and calculates who paired with who, for
how long, how regularily and how recently. At some stage pair stats will
attempt to predict who members of the team should pair with to have the best
pair score with every member of the team.

## Git Repo Required Setup

Pair stats works on a git repo. Every commit has an **Author**. Pair stats will
analyse commits for the _pair_ in any of the following ways:

- `Co-authored-by:` field
- `@github-handle` an @ github handle in the commit
- `:pear:` name after a pear code
- 🍐 name after a pear emoji character

## Installation

```sh
npm install pair-stats --global
```

## Usage

```sh
pair-stats
```

## Test

```sh
npm run jest
```

## Build

```sh
npm run full-build
```
