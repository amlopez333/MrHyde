Welcome to _MrHyde SSG_. This a simple example on how to use _MrHyde_ to create static pages.
We use [EJS](https://github.com/mde/ejs) as our templating engine. Content can be written in EJS, Markdown,
plain HTML or JSON.
This page, for example, is created using Markdown.
Make sure to look at the [docs](https://github.com/amlopez333/MrHyde) to get a better feel of how to use _MrHyde_.
Also, you can look at the [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to get a better feel on how to use _Markdown_. You are also welcome to the [following](https://daringfireball.net/projects/markdown/syntax) [tutorials](https://moz.com/blog/markdown) in order to understand how Markdown translates to HTML.

The project's structure is defined as follows:

        public/
        src/
            assets/
                css/
                sass/
            config/
                site.config.js -> this contains global information
                project.config.js -> this contains information relevant for build
            data/ -> here goes your JSON data files
            layouts/
            pages/
            partials/ 

The `public/` folder is where the site is going to be built. This is the default name, you can otherwise specify a name for this directory in the `project.config` file. The `src` directory and it's subdirectories will contain all that's necessary in order to build your project. The `assets` folder will contain all your css/sass and aditional assets such as images. The `config` file contains all the relevant configuration for your site. `Layouts` contains the templates for your pages. These templates are built using EJS. The `pages` folder will contain all your content, and these files can be written in Markdown, plain HTML, or EJS. The `partials` folder will contain reusable components that you want to use across your pages, like your `nav`, or your `head`. They sort of resemble Server Side Includes. 
