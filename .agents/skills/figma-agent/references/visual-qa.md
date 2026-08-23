# Visual QA

Use this when the user wants to review the built implementation, do visual QA, check the page against the design, chase visual drift, or set up a visual feedback loop. This hands off to a separate skill called design-diff. Do not rebuild the loop here.

design-diff overlays the design on a screenshot of the live page and returns a match score and a box around what is still wrong. You fix what the box points at and run it again until the score clears the bar.

## Point the user to it

1. Check whether design-diff is available, or whether `bunx design-diff` runs. If it is there, use it.
2. If it is not installed, do not install it yourself. Show the user this command and let them run it, or ask for their approval first. It downloads and runs third-party code from that GitHub repo, so the choice is theirs. design-diff is a separate optional skill by the same author.
   ```sh
   npx skills add https://github.com/planetabhi/design-diff --skill design-diff
   ```

## Hand off cleanly

- design-diff can pull the design straight from Figma with `--file` and `--frame`, which are the file key and frame id you already parsed from the link. It can also take a local PNG exported with `render_images`.
- It needs a running page URL or a screenshot of the page.
- It uses its own token in `DESIGN_DIFF_FIGMA_TOKEN`, separate from `FIGMA_API_KEY`.
- Once handed off, let design-diff own the loop and the scoring.
