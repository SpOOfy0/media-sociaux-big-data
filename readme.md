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

Make sure to have the following packages on your computer:
- `docker`: Allow for service containerization;
- `docker-compose`: Allow for easier services and network building and deployment. 

### 📂 Dependencies

If you want to code locally on a microservice, go to the given directory and 

### 🔑 Providing your API key

When all your dependencies are set, you can run the following script:
```sh
npm run prepareKey
```
It will create the ``credentials.json`` file that will contain your Youtube API key.

You will also have the file path in order to provide your key (visible in GCP API console).

### 👷 Building the project

The project is no monolith, so you can build different parts quite easily.

To build **all the project**, run the following command:
```sh
npm run build
```

For specific parts:
- To build only the TypeScript microservices: ``npx tsc``.
- To build only the Python microservices: ``npm run copyPython``.
- To update the static files: ``npm run copyPublic``.
- To update the credentials (need data collector service restart): ``npm run copyCredentials``.

## 🏃 Running the project 🏃

Change directory to the root directory of this project if not already done.
Then run the following commands in different terminals :
```sh
npm run startFirewall
npm run startWebServer
npm run startMachineLearning
```

## 📖 License 📖

[GNU General Public License v3.0](LICENSE)
