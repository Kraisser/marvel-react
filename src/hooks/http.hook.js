import {useState, useCallback} from 'react';

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [process, setProcess] = useState('waiting');

	const request = useCallback(
		async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
			setLoading(true);
			setProcess('loading');

			try {
				const response = await fetch(url, {method, body, headers});

				if (!response.ok) {
					throw new Error(`Couldnt fetch (${url}), status: ${response.status}`);
				}

				const data = response.json();

				setLoading(false);
				return data;
			} catch (e) {
				setLoading(false);
				setProcess('error');
				throw e;
			}
		},
		[]
	);

	const clearErrors = useCallback(() => {
		setProcess('loading');
	}, []);

	return {loading, process, setProcess, request, clearErrors};
};
