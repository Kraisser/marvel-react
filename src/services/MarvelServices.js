import {useHttp} from '../hooks/http.hook';

export default function useMarvelService() {
	const {loading, error, request, clearErrors} = useHttp();

	const _baseUrl = 'https://gateway.marvel.com:443/v1/public/';
	const _apiBase = 'apikey=36f1abc750cc1a335225f4c72681de4e';
	const _charOffset = 0;
	const _comicsOffset = 0;

	const setMaxChars = async () => {
		const maxChars = await request(`${_baseUrl}characters?limit=1&${_apiBase}`);

		return maxChars.data.total;
	};

	const getAllCharacters = async (limit, offset = _charOffset) => {
		let limilOption;

		if (limit || +limit || limit > 0 || limit <= 100) {
			limilOption = `limit=${limit}`;
		}

		const res = await request(`${_baseUrl}characters?${limilOption}&offset=${offset}&${_apiBase}`);

		return res.data.results.map((item) => _transformCharData(item));
	};

	const getCharacter = async (id) => {
		const res = await request(`${_baseUrl}characters/${id}?${_apiBase}`);

		return _transformCharData(res.data.results[0]);
	};

	const getCharacterByName = async (name) => {
		console.log(name);
		const res = await request(`${_baseUrl}characters?name=${name}&${_apiBase}`);

		if (res.data.results[0]) {
			return _transformCharData(res.data.results[0]);
		}

		return false;
	};

	const getAllComics = async (limit, offset = _comicsOffset) => {
		const res = await request(
			`${_baseUrl}comics?issueNumber=0&offset=${offset}&limit=${limit}&${_apiBase}`
		);

		return res.data.results.map((item) => _transformComicsData(item));
	};

	const getComic = async (id) => {
		const res = await request(`${_baseUrl}comics/${id}?${_apiBase}`);

		return _transformComicsData(res.data.results[0]);
	};

	const _transformCharData = (char) => {
		return {
			name: char.name,
			id: char.id,
			description: char.description ? char.description : 'No description',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _transformComicsData = (comics) => {
		const {id, title, thumbnail, pageCount, description, prices, textObjects} = comics;

		return {
			id: id,
			title: title,
			thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
			pageCount: pageCount ? `${pageCount} pages` : 'No information about pages',
			description: description ? description : 'No description',
			language: textObjects[0] ? textObjects[0].language : `no information`,
			price: prices[0].price ? `${prices[0].price}$` : 'Not available',
		};
	};

	return {
		loading,
		error,
		setMaxChars,
		getAllCharacters,
		getCharacter,
		getCharacterByName,
		getAllComics,
		getComic,
		clearErrors,
	};
}
