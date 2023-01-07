# What's this?

[Qurl.gq](https://qurl.gq) is an open-source URL Shortener written in Node.js 🔗

- Displays a graphical map of all visitors
- Optional timestamp and IP address logging (/shortUrl/info)
- Allows for the usage of custom Short URLs (Use your brand name!)

# Screenshots

<a href="https://qurl.gq">
  <img height="400" alt="Homepage" src="https://user-images.githubusercontent.com/97064249/211168549-c31de702-6ef4-4d9d-9814-540e2d89454c.png">
</a>

<a href="https://qurl.gq/glnh4/info">
  <img height="400" alt="Info Page" src="https://user-images.githubusercontent.com/97064249/211168566-1b963631-12ff-4806-9417-64c4ed3aff5b.png">
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

# Tech Stack

Webserver: [Express.js](https://expressjs.com)

Database: [MongoDB](https://www.mongodb.com)

CSS Library: [PicoCSS](https://picocss.com)
