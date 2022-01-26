import './searchChar.css';

import * as yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import useMarvelService from '../../services/MarvelServices';

export default function SearchChar() {
	const {loading, getCharacterByName} = useMarvelService();

	const [char, setChar] = useState(null);

	const getChar = async (name) => {
		const charData = await getCharacterByName(name);

		setChar(charData);
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

					{char === null ? null : char === false ? (
						<div className='errorChar'>{`The character was not found. Check the name and try again`}</div>
					) : (
						<div className='successCharWrapper'>
							<div className='successChar'>{`There is! Visit ${char.name} page?`}</div>
							<Link className='successChar' to={`/character/${char.id}`}>
								<ButtonTriangle value='TO PAGE' background='Grey' />
							</Link>
						</div>
					)}
				</Form>
			</Formik>
		</div>
	);
}
