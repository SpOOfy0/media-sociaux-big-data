# Social Media and Big Data

## ✨ Contributors ✨

<table align="center">
    <tbody>
        <tr>
            <td width="25%" align="center" valign="top">
                <a href="https://github.com/fedyna-k">
                    <img src="https://avatars.githubusercontent.com/u/40734890" width="100px" style="clip-path: circle(50%)"> <br/>
                    <b>Kevin FEDYNA</b>
                </a> <br/>
                <a title="Code & Documentation" href="https://github.com/fedyna-k/media-sociaux-big-data/commits?author=fedyna-k">💻</a>
            </td>
    </tbody>
</table>

## ⚙️ Building the project ⚙️

### 🏗️ Prerequisites

Make sure to have the latest `docker` available on your computer. 

### 📂 Dependencies

In each microservice, you'll find a `local.sh` file that will go through the dependency installation process.
For python microservices, it will also create the virtual environment.

You simply need to run the following command:
```sh
cd <microservice>
sh local.sh
```

### 🔑 Providing your API key

If you installed the web-server service, you'll find a templated `credentials.json` at service root.

This file needs to be filled with your Youtube API key.

### 👷 Building the project

The project is no monolith, so you can build different parts quite easily.

To build **the entire project**, run the following command:
```sh
docker compose build
```

To build specific parts, run the following command:
```sh
docker compose build <microservice>
```

To remove all dangling images from your disk, run the following command:
```sh
docker image prune
```

## 🏃 Running the project 🏃

To run **the entire project**, run the following command:
```sh
docker compose up
```

If you want to shutdown the project, run the following command:
```sh
docker compose down
```

To restart a given microservice, run the following command:
```sh
docker compose restart <microservice>
```

While developing, you may want to build and restart individual services in order to keep your app up and running.

## 📖 License 📖

[GNU General Public License v3.0](LICENSE)
