# Express - GraphQL

Implementation of GraphQL in express 

## Prepare
Create and import the database
```bash
mysqladmin -u user -p create database library
mysql -u user -p library < library.sql
```

Create the configuration file and fill variables
```bash
cp .env.dist .env
```

## Run
Serve it 
```bash
npm run serve
```

## Query Examples
Go to the GraphQL console and run a query

```graphql
mutation {

  addAuthor(name: "Killian Jornet") {
    id,
    name
  }

  addGenre(name: "Sport") {
    id,
    name
  }

  addBook(
    name: "A Manual for Mountain Runners and Ski Mountaineers ", 
    genreId: 3, 
    authorIds: [3,4,5]
  ) {
    id,
    name,
    genre {
      id,
      name
    },
    authors {
      id,
      name
    }
  }

}
```

```graphql
query {
  books {
    id,
    name,
    genre {
      id,
      name
    },
    authors {
      id,
      name
    }
  },
  genres {
    id,
    name
  },
  authors {
    id,
    name
  }
  book(id: 3) {
    id,
    name
  }
  author(id: 3) {
    id,
    name
  }
}
```
