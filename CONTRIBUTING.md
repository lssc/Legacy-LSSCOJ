# Contributing to LSSCOJ

Thanks for your interest in LSSCOJ. Our goal is to build a large competitive programmer communities in Taiwan.

## Getting Started

LSSCOJ's [open issues are here](https://github.com/lssc/LSSCOJ/issues). In time, we'll tag issues that would make a good first pull request for new contributors. An easy way to get started helping the project is to *file an issue*. You can do that on the LSSCOJ issues page by clicking on the green button at the right. Issues can include bugs to fix, features to add, or documentation that looks outdated. 

For some tips on contributing to open source, this [post is helpful](https://opensource.guide/how-to-contribute/).

## Development Enviroment

LSSCOJ is already dockerized, which mean it is easier to setup the enviroment.

Before we start make sure you have [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/) installed.

When developing, I recommend to only run the database service, and run the web service manually.

```console
docker-compose up db
```

To start the web server manually, make sure you have [Node.js](https://nodejs.org/) installed. open a new terminal and run `npm install` in the first time to install dependencies. Execute the following command to start the development server.

```console
DEBUG=express:* \
DB_HOST=localhost \
DB_USER=lsscoj \
DB_PASS=CHANGE_THIS \
DB_NAME=lsscoj \
npm start
```

Congratulation, you have your environment setted.

## Contributions

LSSCOJ welcomes contributions from everyone.

Contributions to LSSCOJ should be made in the form of GitHub pull requests. Each pull request will
be reviewed by a core contributor (someone with permission to land patches) and either landed in the
main tree or given feedback for changes that would be required.

## Pull Request Checklist

-   Branch from the master branch and, if needed, rebase to the current master branch before submitting your pull request. If it doesn't merge cleanly with master you may be asked to rebase your changes.

-   Commits should be as small as possible, while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests). 

-   Don't put submodule updates in your pull request unless they are to landed commits.

-   If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment.

-   Add tests relevant to the fixed bug or new feature.  
