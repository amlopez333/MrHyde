---
title: Another Page
layout: minimal
---
## Welcome to a basic intro about Front Matter.

This is a page written in _Markdown_ using [Front Matter](www.frontmatter.org) to specify "page" variables.
As explained in the docs, information you want to expose globally is passed through *site.config*. Information you want to expose locally to a single page is passed through _Front Matter_. 

Front Matter is simply YAML declared at the beginning of the page.
In this case, are specifying the page's title as "Another Page" and telling our templating engine to render with different layout by specifying the layour as "Minimal".

This is what allows you to create your own layouts to suit the needs of your static page.