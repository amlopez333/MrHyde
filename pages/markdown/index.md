---
title: Front Matter
layout: minimal
---
## Welcome to a basic intro about Front Matter.

This is a page written in Markdown using [Front Matter](https://jekyllrb.com/docs/frontmatter/) to specify page variables.
As explained in the [docs](https://github.com/amlopez333/MrHyde), information you want to expose globally is passed through `site.config`. Information you want to expose locally to a single page is passed through Front Matter. 

Front Matter is simply YAML declared at the beginning of the page.
In this case, we are specifying the page's title as "Another Page" and telling our templating engine to render with different layout by specifying the layout as "Minimal". You can inlude Front Matter in any kind of page, whether it be EJS, Markdown, or HTML.

This is what allows you to create your own layouts to suit the needs of your static page.