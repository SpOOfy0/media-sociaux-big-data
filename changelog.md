# Changelog

## October

### [`[9ba5033]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/9ba503374ec648e32231a7dbb8e23968be14a82a) Finished implementing architecture v3
### [`[1caa679]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/1caa6796688779d9dd2b4bf30d8c4d342387f793) Better configuration of services and mongodb integration started

**Switched to Docker compose after in-depth study.**

#### Improvements of previous version 
- Added data collector service.
- Added database handler service.
- Added MongoDB docker image.
- Better networking and security.

#### Possible further improvements
- Implement LLM on video comments to make sentiment analysis. 

---

### [`[b948c66]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/b948c66de91dea404e040aca9310a2a7a1a0258c) Switched to alpine images (4x less memory taken)

**Switched to alpine images to reduce from 8MB to 2MB in total.**

#### Improvements of previous version 
- Switched to alpine images.
- Docker images are more lightweight.

#### Possible further improvements
- Create data collector service.
- Create database handler service.
- Add MongoDB docker image.

---

### [`[6e5a778]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/6e5a7788b7ff1fb10341b5f73d7342795dfebe5e) Switched to more modern Docker
### [`[4c7cc0c]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/4c7cc0c438729cacd1dd9d371b7434b61f79fea2) Updated readme
### [`[b288343]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/b2883431492dfd554174e9edb362ad44d69c27e4) Created local.sh for microservice local dev install
### [`[9f3d3e8]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/9f3d3e81aeb6ba73fc175fae8b61005a3ca003b7) Changed path to right log folder
### [`[3b6b721]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/3b6b72122c9fc0f229c30de9e37b867b1802b644) Changed path to right log folder
### [`[88a1619]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/88a1619db5a676f9728801bb8a742db1b19ac48c) Switched to Docker compose

**Switched to Docker compose after in-depth study.**

#### Improvements of previous version 
- Switched to Docker compose.
- Created internal network.
- Real firewall/reverse proxy implementation.
- Better networking and security.

#### Possible further improvements
- Reduce Docker images size (currently all images are 8MB in total).

---

### [`[2c6bef1]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/2c6bef1873f47d191185a24d0038f81040b53e92) Added firewall to force trafic load balencer
### [`[4d90994]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/4d9099457e5809fca23c203eb020db41161b2c93) Added log in files and put common libs in dedicated folder
### [`[7eb753f]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/7eb753fa5e1007c42ced4c32025df8afc08ef013) Changed to microservice architecture

**Switched existing services to microservice architecture**

#### Improvements of previous version 
- Added homemade firewall and auth mecanism to avoid calling "internal microservices".
- Created Dockerfiles to build Docker images for each microservice.
- Created common `log` volume to share microservices logs.

#### Possible further improvements
- Learn about Docker compose.
- Switch to Docker compose if it is relevant.

---

### [`[a1de6aa]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/a1de6aac5a0cd2be82febf3bb5c3d1262b13755a) Update readme link
### [`[81ec446]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/81ec446d5fb3e23896c8161b3f973408823430f0) Added licence and made prettier readme.md
### [`[b7bb9e2]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/b7bb9e2caded4fd303276cd4e64830c1802f1d6f) Added comment on data transfer for image
### [`[f833b3e]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/f833b3ec10b99942d0079b8770b52634ae140cb5) Added Part 1 markdown
### [`[e36ce4e]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/e36ce4e8bbe9192a376771db624cfe83c33052ed) Updated building process
### [`[bab069b]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/bab069b006e48c2012a262d4c64fa1fb4d214e8c) Added handler for missing API key.

**Finished part 1 for MSBD course.**

#### Improvements of previous version 
- Fixed minor bugs.
- Added documentation.
- Improved build process for current architecture (using npm).
- Improved readme readability.

#### Possible further improvements
- Switch to microservices to handle more functionnalities.

---

### [`[6b29693]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/6b296935eb1feee6237d07b8478150c276aa5fcb) Finished part 1

**Finished implementation of [architecture v.2](https://github.com/fedyna-k/media-sociaux-big-data/blob/main/docs/images/Architecture%20v.2.png)**

#### Improvements of previous version 
- Multi-language architecture.
- Two different environment.
- RESTful API architecture.

#### Possible further improvements
- Better git repository.
- Bug fixing.
- Better building process.

## September

### [`[ccc0469]`](https://github.com/fedyna-k/media-sociaux-big-data/commit/ccc0469390809f1aae30669e996ba2f0b729402d) Initial commit

**First version of architecture was made and implemented**

#### Improvements of previous version
- Fetching data from youtube videos.
- Process those data and return them either as CSV or JSON.

#### Possible further improvements
- Machine learning on data.