# SCRAPE ME

An entry level Web Scraping CLI

## Documentation

[Docs](http://127.0.0.1:8080)

```bash
# Generate docs and to serve docs
npm run doc
```

## Installation

### Init

```bash

npm i

chmod 777 bin/fetch

chmod 777 downloads

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
