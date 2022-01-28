import './searchChar.css';

import * as yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import useMarvelService from '../../services/MarvelServices';

function setContent(process, Component, data) {
	switch (process) {
		case 'success':
			return <Component data={data} />;
		case 'notFound':
			return (
				<div className='errorChar'>The character was not found. Check the name and try again</div>
			);
		case 'error':
			return <div className='errorChar'>Error Fetching</div>;
		default:
			return;
	}
}

export default function SearchChar() {
	const {loading, getCharacterByName, process, setProcess} = useMarvelService();

	const [char, setChar] = useState(null);

	const getChar = (name) => {
		getCharacterByName(name)
			.then(onLoadChar)
			.then(() => setProcess(`success`))
			.catch((e) => {
				if (e.message === 'Character not found') {
					setProcess(`notFound`);
				}
			});
	};

	const onLoadChar = (char) => {
		setChar(char);
	};

	return (
		<div className='charSearchWrapper'>
			<h3 className='charSearchHeader'>Or find a character by name:</h3>
			<Formik
				initialValues={{
					charName: '',
				}}
				validationSchema={yup.object({
					charName: yup.string().min(2, 'Too short name').required('Required field'),
				})}
				onSubmit={(values) => getChar(values.charName)}>
				<Form>
					<div className='charSearchForm'>
						<Field
							className='charSearchInput'
							type='text'
							name='charName'
							id='charName'
							placeholder='Enter Name'
						/>
						<ButtonTriangle value='FIND' background='Red' disabled={loading} type='submit' />
					</div>

					<ErrorMessage className='errorChar' component='div' name='charName' />

					{setContent(process, ViewChar, char)}
				</Form>
			</Formik>
		</div>
	);
}

function ViewChar({data}) {
	const {name, id} = data;
	return (
		<div className='successCharWrapper'>
			<div className='successChar'>{`There is! Visit ${name} page?`}</div>
			<Link className='successChar' to={`/character/${id}`}>
				<ButtonTriangle value='TO PAGE' background='Grey' />
			</Link>
		</div>
	);
}
