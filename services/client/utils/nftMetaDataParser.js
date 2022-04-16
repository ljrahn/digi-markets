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
    this.__parseMetadataDescription(data);
    this.__parseMetadataAttributes(data);
    this.__parseMetadataCreator(data);
    this.__parseMetadataFeatures(data);
    this.__parseMetadataAnimationUrl(data);
    return this.sorted_metadata;
  }

  __parseMetadataDescription(data) {
    const object = Object();

    if (data.description) {
      object.description = (
        <div className="text-center text-gray-100">{data.description}</div>
      );
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
              className="bg-slate-800 flex flex-col text-center items-center justify-center p-2 rounded-xl"
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
      object.creator = (
        <div className="text-center text-gray-100">{data.creator}</div>
      );

      this.sorted_metadata.push(object);
    } else if (data.artist) {
      object.artist = (
        <div className="text-center text-gray-100">{data.artist}</div>
      );

      this.sorted_metadata.push(object);
    }
  }

  /**
   * TODO
   * CURRENTLY BROKEN - CORS issue? and some other things i think
   * Parse the animation url.
   * @param {object} data - the token_uri data
   */
  __parseMetadataAnimationUrl(data) {
    const object = Object();

    if (data.animation_url) {
      object.animation = (
        <iframe className="mx-auto" src={data.animation_url}></iframe>
      );

      this.sorted_metadata.push(object);
    }
  }

  __parseMetadataFeatures(data) {
    const object = Object();
    if (data.features && typeof data.features === "object") {
      const keys = Object.keys(data.features);
      object.features = (
        <div className="grid grid-cols-3 gap-4">
          {keys.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 flex flex-col text-center items-center justify-center p-2 rounded-xl"
            >
              <div className="underline text-white underline-offset-2 text-sm">
                {item}
              </div>
              <div className="text-md">{data.features[item]}</div>
            </div>
          ))}
        </div>
      );

      this.sorted_metadata.push(object);
    }
  }

  __parseImage(data) {
    const ipfsOrHttp = (imageData) => {
      let imageSrc = null;

      if (imageData.startsWith("ipfs://")) {
        imageSrc =
          "https://gateway.moralisipfs.com/ipfs/" +
          imageData.split("ipfs://").pop();
      } else if (
        imageData.startsWith("http://") ||
        imageData.startsWith("https://")
      ) {
        imageSrc = imageData;
      }
      return imageSrc;
    };

    if (data.image) {
      return ipfsOrHttp(data.image);
    } else if (data.image_url) {
      return ipfsOrHttp(data.image_url);
    }
    return null;
  }
}
