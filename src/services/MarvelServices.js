import {useHttp} from '../hooks/http.hook';

export default function useMarvelService() {
	const {loading, error, request, clearErrors} = useHttp();

	const _baseUrl = 'https://gateway.marvel.com:443/v1/public/';
	const _apiBase = 'apikey=36f1abc750cc1a335225f4c72681de4e';
	const _charOffset = 0;

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

		return res.data.results.map((item) => _transformData(item));
	};

	const getCharacter = async (id) => {
		const res = await request(`${_baseUrl}characters/${id}?${_apiBase}`);

		return _transformData(res.data.results[0]);
	};

	const getAllComics = async () => {
		const res = await request(`${_baseUrl}comics?issueNumber=0&limit=8&${_apiBase}`);

		return res.data.results;
	};

	const _transformData = (char) => {
		return {
			name: char.name,
			id: char.id,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	return {loading, error, setMaxChars, getAllCharacters, getCharacter, getAllComics, clearErrors};
}
