export default class NFTMetaDataParser {
  constructor(item) {
    this.item = item;
    this.image_src = null;
    this.sorted_metadata = Array();
  }

  async getImageUrl() {
    // Check if there is an image in the metadata
    if (this.item.token_uri) {
      // Then check if token uri is http or https
      if (
        this.item.token_uri.startsWith("http://") ||
        this.item.token_uri.startsWith("https://")
      ) {
        // fetch the token uri
        const res = await fetch(this.item.token_uri);
        const data = await res.json();
        // check if token uri image is ipfs or http and set image src
        this.image_src = this.__parseImage(data);
        // If token uri is not http or https check if token uri is ipfs
      } else if (this.item.token_uri.startsWith("ipfs://")) {
        // And fetch ipfs token uri
        tokenUri =
          "https://gateway.moralisipfs.com/ipfs/" +
          this.item.token_uri.split("ipfs://").pop();
        const res = await fetch(tokenUri);
        const data = await res.json();
        // check if token uri image is ipfs or http and set image src
        this.image_src = this.__parseImage(data);
      } else {
        const data = JSON.parse(this.item.token_uri.split("json;utf8,").pop());
        this.image_src = data.image;
      }
    }
    return this.image_src;
  }

  async getSortedMetadata() {
    // Check item has token_uri
    if (this.item.token_uri) {
      // Then check if token uri is http or https
      if (
        this.item.token_uri.startsWith("http://") ||
        this.item.token_uri.startsWith("https://")
      ) {
        // fetch the token uri
        const res = await fetch(this.item.token_uri);
        const data = await res.json();
        this.sorted_metadata = this.__parseMetadata(data);
        // If token uri is not http or https check if token uri is ipfs
      } else if (this.item.token_uri.startsWith("ipfs://")) {
        // And fetch ipfs token uri
        tokenUri =
          "https://gateway.moralisipfs.com/ipfs/" +
          this.item.token_uri.split("ipfs://").pop();
        const res = await fetch(tokenUri);
        const data = await res.json();
        this.sorted_metadata = this.__parseMetadata(data);
      } else {
        const data = JSON.parse(this.item.token_uri.split("json;utf8,").pop());
        this.sorted_metadata = this.__parseMetadata(data);
      }
    }
    return this.sorted_metadata;
  }

  __parseMetadata(data) {
    console.log(data);
    this.__parseMetadataDescription(data);
    this.__parseMetadataAttributes(data);
    this.__parseMetadataCreator(data);
    this.__parseMetadataFeatures(data);
    return this.sorted_metadata;
  }

  __parseMetadataDescription(data) {
    const object = Object();

    if (data.description) {
      object.description = data.description;
      this.sorted_metadata.push(object);
    }
  }

  __parseMetadataAttributes(data) {
    const object = Object();

    if (data.attributes) {
      object.attributes = (
        <div className="grid grid-cols-3 gap-4">
          {data.attributes.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 flex flex-col text-center items-center p-2 rounded-xl"
            >
              <div className="underline text-white underline-offset-2 text-sm">
                {item.trait_type}
              </div>
              <div className="text-md">{item.value}</div>
            </div>
          ))}
        </div>
      );
      this.sorted_metadata.push(object);
    }
  }

  __parseMetadataCreator(data) {
    const object = Object();

    if (data.creator) {
      object.creator = data.creator;
      this.sorted_metadata.push(object);
    } else if (data.artist) {
      object.artist = data.artist;
      this.sorted_metadata.push(object);
    }
  }

  __parseMetadataFeatures(data) {
    return data;
  }

  __parseImage(data) {
    let imageSrc = null;

    if (data.image) {
      if (data.image.startsWith("ipfs://")) {
        imageSrc =
          "https://gateway.moralisipfs.com/ipfs/" +
          data.image.split("ipfs://").pop();
      } else if (
        data.image.startsWith("http://") ||
        data.image.startsWith("https://")
      ) {
        imageSrc = data.image;
      }
    }

    return imageSrc;
  }
}
