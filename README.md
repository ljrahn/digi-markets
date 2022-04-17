# `Running the Application`

Docker is required in order to run the application. Follow https://docs.docker.com/engine/install/#server for details on how to install the docker engine and https://docs.docker.com/compose/install/ for details on how to install docker compose.

## `Env Variables`

- Before running the application in development, staging, or production, environment variables will need to be set. For a development, or staging build, set the name of your env file to `.env.dev`, and for production build set the name of your env file to `.env.prod`.
- Since the application is built off of moralis you will need to head over to https://moralis.io/ sign up for free, and request a web3 api key, then set `MORALIS_API_KEY` in the env file.
- For the server env variables, set `SERVER_URL`, and the `SECRET_KEY`. `SECRET_KEY` can be anything, just make it hard to guess. `SERVER_ADMIN_USER`
  and `SERVER_ADMIN_PASSWORD`, are the credentials that will be used to access the admin page for database details and modification. This can be accessed at http://localhost:5000/api/admin for dev and http://localhost/api/admin for staging.
- Set the database env variables `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` to what you wish.
- `CLIENT_URL` is important for production to set the CORS policy in the backend, but for dev, or staging, it is not important

## `Run Development Application`

Running in development is good for changing application code without having to restart the development server. This will not use nginx as a reverse proxy service. You will view the application at http://localhost:3000

### Start nextjs application

start the nextjs development server:

```
cd services/client
npm run dev
```

### Start python flask server

In another terminal window start the flask server:

```
docker-compose -f docker-compose.dev.yml up --build
```

## `Run Staging Application`

This is the closest to a production build of the app. It will use nginx as a reverse proxy and the application can be viewed at http://localhost

```
docker-compose -f docker-compose.staging.yml up --build
```

## `Run Production Application`

In order to run the application in production there will need to be a little leg word done on your behalf, and probably some knowledge about deploying to production in general.

- Put ssl certs `your_domain.crt` and `your_domain.key` in `/services/nginx/certs` directory
- In the server blocks of `/services/nginx/prod.conf` set `server_name` to your domain name
- In `/services/nginx/Dockerfile.prod` set the `COPY` statements to reference your SSL certs
- In `/services/client/.env.production` change `NEXT_PUBLIC_SERVER_BASE_URL` to suit your domain.
- In the `.env.prod` file make sure `ENVIRONMENT=prod` and set your `CLIENT_URL` and `SERVER_URL` to your domain name accordingly
- For `docker-compose.prod.yml` you will need to change it based on what best fits your needs. Personally, I use private dockerhub repositories and push my images to the private repos, then when I run `docker-compose -f docker-compose.prod.yml up --pull` the images are pulled from the dockerhub repos.
- There are many ways of running a production build, and you may need to do what works best for you, which will require modification of `docker-compose.prod.yml` and other files.

## `Backup database`

If for some reason the database needs to be backed up:

```
docker exec <container-id> pg_dump -Fc <db-name> -U <db-user> > db.dump
```

# `Models`

## `table NFTContract`

```
name : String
symbol : String
contract_address : String
image : String
verified : Boolean
search_count : BigInteger
network : BlockchainNetwork
```

## `table BlockchainNetwork`

```
name : String
short_name : String
chain_id : Integer
network_id : Integer
supported : Boolean # whether or not the chain is supported
currency : String # (Possible: ETH, MATIC)
```

# `Server Resources`

## `/api/network`

<br>

### `GET /api/network/<integer:chain_id>`

Query table BlockchainNetwork by chain_id

```
returns: {
  name,
  short_name,
  chain_id,
  network_id,
  supported,
  currency
}
```

### `GET /api/network`

Query ALL table BlockchainNetwork

```
returns: {
  total: # of nfts for address,
  page: {page},
  page_size: {page_size},
  num_pages: int(({total} + {page_size} - 1) / {page_size})
  num_results = len({result})
  result = [
    {
      name,
      short_name,
      chain_id,
      network_id,
      supported,
      currency
    }
  ]
}
```

---

## `/api/nft`

<br>

### `GET /api/nft/eoa/<string:address>`

Query `moralis.com/<string:address>/nft?chain={chain}` for all nfts owned by a given eoa address

Options:

- chain (optional, default: eth): the chain to query on
- page (optional, default: 1): the page to query for will
- page_size (optional, default: 100): the number of results to return

```
returns: {
  total: # of nfts for address,
  page: {page},
  page_size: {page_size},
  num_pages: int(({total} + {page_size} - 1) / {page_size})
  num_results = len({result})
  result: [
    {
      contract_address,
      name,
      symbol,
      owner,
      token_uri,
      token_id,
      metadata
    }
  ]
}
```

### `GET /api/nft/eoa/<string:address>/transfers`

Query `moralis.com/<string:address>/nft/transfers?chain={chain}` for all nft transfers to and from a given eoa address

Options:

- chain (optional, default: eth): the chain to query on
- page (optional, default: 1): the page to query for will
- page_size (optional, default: 100): the number of results to return

```
returns: {
  total: # of nft transfers for account,
  page: {page},
  page_size: {page_size},
  num_pages: int(({total} + {page_size} - 1) / {page_size})
  num_results = len({result})
  result: [
    {
      block_number,
      block_timestamp,
      transaction_hash,
      from_address,
      to_address,
      value,
      contract_address,
      name,
      symbol,
      token_id
    }
  ]
}
```

### `GET /api/nft/contract/<string:address>`

Query `moralis.com/nft/<string:address>?chain={chain}` for page_size nfts of given contract

Options:

- chain (optional, default: eth): the chain to query on
- page (optional, default: 1): the page to query for
- page_size (optional, default: 100): the number of results to return

```
returns: {
  total: # of nfts for contract,
  page: {page},
  page_size: {page_size},
  num_pages: int(({total} + {page_size} - 1) / {page_size})
  num_results = len({result})
  result: [
    {
      contract_address,
      name,
      symbol,
      token_uri,
      token_id,
      metadata
    }
  ]
}
```

### `GET /api/nft/contract/<string:address>/<integer:token_id>`

Query `moralis.com/nft/<string:address>/<integer:token_id>?chain={chain}`
for data on a given token id of a contract

Options:

- chain (optional, default: eth): the chain to query on

```
returns: {
  contract_address,
  name,
  symbol,
  owner,
  token_uri,
  token_id,
  metadata
}
```

### `GET /api/nft/contract/<string:address>/<integer:token_id>/transfers`

Query `moralis.com/nft/<string:address>/<integer:token_id>/transfers?chain={chain}`
for transfer data on a given token id for a given contract

Options:

- chain (optional, default: eth): the chain to query on
- page (optional, default: 1): the page to query for will
- page_size (optional, default: 100): the number of results to return

```
returns: {
  total: # of transfers for token_id,
  page: {page},
  page_size: {page_size},
  num_pages: int(({total} + {page_size} - 1) / {page_size})
  num_results = len({result})
  result: [
    {
      block_number,
      block_timestamp,
      transaction_hash,
      from_address,
      to_address,
      value,
      contract_address,
      name,
      symbol,
      token_id
    }
  ]
}
```

### `POST /api/nft/contract/<string:address>/count`

Query `table NFTContract` by address for existing contract entry. IF no entry: (Query `moralis.com/nft/<string:address>/metadata?chain={chain}`,
If exists: (add entry to table NFTContract, increase search count by 1) ELSE: RETURN {message: "Contract does not exist"})
ELSE: Increase contract entry search count by 1

Options:

- chain (optional, default: eth): the chain to query on

```
returns: {
    contract_address,
    name,
    image,
    verified,
    network: {chain_id, name, short_name},
    search_count,
    symbol,
    contract_type
}
```

### `GET /api/nft/contract/search`

Query table NFTContract sorted by verified THEN highest search count. Searches for partial words.
Searches case insensitive

Options:

- q (required): Search query to execute
- filter (required): Filter to use. Options: "name", "symbol", "name,symbol"
- chain (optional, default: eth): the chain to query on
- page (optional, default: 0):
- page_size (optional, default: 100): the number of results to return
- verified (optional, default: null): Set true to only display verified contracts. Set false to
  only display non verified contracts. Do not set to display both

```
returns: [
  total: # of contracts,
  page: {page},
  page_size: {page_size},
  num_pages: int(({total} + {page_size} - 1) / {page_size})
  num_results = len({result})
  result: [
  {
    contract_address,
    name,
    image,
    verified,
    network: {chain_id, name, short_name},
    search_count,
    symbol,
    contract_type
  }
]
```

# `Client`

## `Web3 Hooks`

All hooks use SWR, mostly for caching, but some are used to ensure data is always fresh

### `useNetwork ()`

```
chainId = web3.getChainId()
network = GET /api/network/{chain_id}
RETURNS {network}
```

### `useAccount ()`

```
account = web3.getAccounts()[0]
RETURNS {account}
```

## `Server Hooks`

### `useNetworkData (text, filter="name")`

### `useContractSearch (text, filter="name")`

```
network = useNetwork()
results = GET /api/nft/search?q={text}&filter={filter}&chain={network}
RETURNS {results}
```

### `useNFTTokenList (contract_address)`

```
network = useNetwork()
nfts = GET /api/nft/contract/{contract_address}?chain={network}
RETURNS nfts
```

### `useTokenData (contract_address, token_id)`

```
network = useNetwork()
token = GET /api/nft/contract/{contract_address}/{token_id}
token_transfers = GET /api/nft/contract/{contract_address}/{token_id}/transfers

RETURNS token, token_transfers

```

### `useAccountData ()`

```
account = useAccount()
network = useNetwork()
account_nfts = GET /api/nft/eoa/{account}?chain={network}
account_transfers = GET /api/nft/eoa/{account}/transactions?chain={network}

RETURNS account_nfts, account_transfers
```

### `useMarketData ()`

```
contract = useWeb3()
nfts_for_sale = contract.methods.fetchMarketItems()
my_market_nfts = contract.methods.fetchMyNFTs()

RETURNS nfts_for_sale, my_market_nfts
```

## `Navbar`

### `Global search bar`

```
type text : useContractSearch(text)
click selection : REDIRECT --> "NFT Contract Page" && POST /api/nft/contract/<string:address>/count
click enter with words (not pre-fixed by 0x) : REDIRECT --> "More Search Results Page"
click enter with exact nft contract address (pre-fixed by 0x): REDIRECT --> "NFT Contract Page" &&
    POST /api/nft/contract/<string:address>/count
```

## `Home Page : /`

### `Top NFTs`

```
useContractSearch("") ## Empty query will return highest search count ##
```

### `Currently For Sale`

```
useMarketData()
```

## `NFT Contract Page : /nft/<string:address>`

### `Token Id Search Bar`

```
click enter with number : REDIRECT --> "NFT Token Page"
```

### `NFT Token Collection`

```
useNFTTokenList (contract_address)
click nft : REDIRECT  --> "NFT Token Page"

```

### `Change Page`

```
???
```

## `NFT Token Page : /nft/<string:address>/<int:token_id>`

```
GET /api/nft/<string:address>/<int:token_id>
```

## `More Search Results Page : /nft/search`

```
GET /api/nft/search?q="WORDS"&filter="name,symbol"
click contract : REDIRECT --> "NFT Contract Page" && POST /api/nft/<string:address>
```
