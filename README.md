# `Run Development Server`

```
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

## `Backup database`

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

# `Server`

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

## `Hooks`

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
