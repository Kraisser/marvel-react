export default class MarvelService {
  #baseUrl = 'https://gateway.marvel.com:443/v1/public/';
  #apiBase = 'apikey=36f1abc750cc1a335225f4c72681de4e';
  #charOffset = 0;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldnt fetch (${url}), status: ${res.status}`)
    }

    return await res.json();
  }

  setMaxChars = async () => {
    const maxChars = await this.getResource(`${this.#baseUrl}characters?limit=1&${this.#apiBase}`);
  
    return maxChars.data.total;
  }

  getAllCharacters = async (limit, offset = this.#charOffset) => {
    let limilOption;

    if (limit || +limit || limit > 0 || limit <= 100) {
      limilOption = `limit=${limit}`;
    }

    const res = await this.getResource(`${this.#baseUrl}characters?${limilOption}&offset=${offset}&${this.#apiBase}`);
        
    return res.data.results.map(item => this._transformData(item))
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this.#baseUrl}characters/${id}?${this.#apiBase}`);
    
    return this._transformData(res.data.results[0]);
  }

  _transformData = (char) => {
    
    return ({
      name: char.name,
      id: char.id,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    })
  }
}