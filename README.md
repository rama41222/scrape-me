# SCRAPE ME

An entry level Web Scraping CLI

## Documentation

[Docs](http://127.0.0.1:8080)

```bash
# Generate docs and to serve docs
npm run doc

# After building the docker image
docker-compose up
```

## Installation using DOCKER

[Learn Docker basics here.](https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4)

1. Start docker in your system
2. Build the docker image

   ```bash
    docker-compose build --progress=plain
   ```

3. Run the docker services

   ```bash
    DOCS and Container BROWSER
    ----------------

    docker-compose up
    
    CLI
    ---

    # Crawl a web
    docker-compose run fetch  https://www.google.com 
   
    # Crawl multiple webs
    docker-compose run fetch  https://www.google.com https://www.autify.com

    # Help
    docker-compose run fetch --help

    # Metadata
    docker-compose run fetch --metadata https://www.google.com 
   ```

Other important docker commands

```bash
    docker-compose stop
    docker-compose start
    docker-compose run <custom service>
```

## Installation

### Init

```bash

npm i

chmod 755 bin/fetch

mkdir downloads

chmod 755 downloads

```

### Fetch command

```bash

npm link

```

### Building steps after linking

```bash
rm -rf tsconfig.tsbuildinfo && npm run build
```

### Crawling

```bash
#### AVAILABLE COMMANDS
-----------------------

    '--metadata': Array<string>;
    '--help': boolean;
    '--crawl': Array<string>;

#### EXAMPLES
-------------

    # To crawl a web
      fetch https://www.google.com https://www.autify.com
    
    # To print metadata
      fetch --metadata https://www.google.com https://www.autify.com https://www.yahoo.com
    
    # To print help
      fetch --help
    
    # To to all at once
      fetch https://www.google.com https://www.autify.com --metadata https://www.google.com https://www.autify.com https://www.yahoo.com --help

```
