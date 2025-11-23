---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline --decorate`

## Your task

Analyze the changes in the working directory and create appropriate git commits.

**Important:**

1. Review all changed files (both staged and unstaged)
2. Group related changes together logically
3. If there are multiple unrelated changes, create separate commits for each logical group
4. Use only staged changes for commit
5. Avoid mixing unrelated changes in the same commit
6. Commit short summary and body must be in Korean (scope must be in English because it would be package name or directory name)
7. Do not co-author commits (Claude)

**Steps:**

- First, analyze the git status and diff to understand all changes
- Identify logical groups of related changes
- For each group:
  - Create a commit with an appropriate message
- If changes are simple and related, a single commit is fine

Once you have staged the necessary changes for a commit group, create the commit.
Use the following format for the commit message:

```
(<scope>): <emoji type> <short summary>
<BLANK LINE>
<body (optional)>
<BLANK LINE>
```

emoji type can be one of the following:

- ✨ : add/fix feature
- ✏️ : comments or typo fix
- ♻️ : refactor
- 🎨 : add/change UI layout or CSS
- 🍱 : add/change static files
- 💬 : apply code review
- 📝 : documentation
- 🚀 : release commit
- 📦 : npm package update (package.json)
- ⚡️ : improve performance
- 🐛 : fix bug
- 💅 : fix lint, prettier error
- 🔥 : hot fix
- 🧹 : remove unnecessary code or files
- 👷 : add/change ci/cd workflow
- ⚙️ : add/change project config file (eslintrc, prettierrc etc.)
- 🦋 : commit changeset file
- 🚧 : work in progress, but commit for split large scale jobs
- 🔁 : fix rebase conflict issue
