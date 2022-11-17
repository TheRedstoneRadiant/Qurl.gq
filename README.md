# What's this?

[Qurl.gq](https://qurl.gq) is an open-source URL Shortener written in Node.js 🔗

# Screenshots

<a href="https://qurl.gq">
  <img height="400" alt="Homepage" src="https://user-images.githubusercontent.com/97064249/195446316-9442778e-7aa5-4c96-b051-202a58442881.png">
</a>

<a href="https://qurl.gq/glnh4/info">
  <img height="400" alt="Info Page" src="https://user-images.githubusercontent.com/97064249/195446416-aec6fdbb-4cb9-4500-babb-771c3818181d.png">
</a>

<a href="https://qurl.gq/glnh4/info">
  <img height="400" alt="Map" src="https://user-images.githubusercontent.com/97064249/195446479-f638ece3-b796-4c29-9d8a-320ad369fc33.png">
</a>

# Development

Clone the repo

```bash
git clone https://github.com/TheRedstoneRadiant/Qurl.gq
cd Qurl.gq
```

Copy .env.example and replace MongoDB URI

```bash
cp .env.example .env
nano .env
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```
To run the linter via the command line on your entire project's source code

`npm run lint` 

To fix every rule violation noticed by Linter
> **_NOTE:_**  `eslint --fix` will fix every rule violation it is capable of fixing, actually overwrite the code, and print out any warnings or errors it was incapable of fixing.
`  npm run lint:fix ` 

# Tech Stack

Webserver: [Express.js](https://expressjs.com)

Database: [MongoDB](https://www.mongodb.com)

CSS Library: [PicoCSS](https://picocss.com)
