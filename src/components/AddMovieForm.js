import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddMovieForm = (props) => {
    const { push } = useHistory();
    const { id } = useParams();

    const { setMovies } = props;
	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:9000/api/movies`, movie)
        .then(resp => {
            setMovies(resp.data);
            push(`/movies`);

        })
        .catch(err => {
            console.log(err);
        })
    }


return (
    <div className='col'>
        <div className='modal-content'>
            <form onSubmit={handleSubmit}>
                <div className='modal-header'>
                    <h4 className='modal-title'>Add New Movie</h4>
                </div>
                <div className='modal-body'>
                    <div className='form-group'>
                        <label>Title</label>
                        <input 
                        onChange={handleChange} 
                        // value={title} 
                        name="title" 
                        type="text" 
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
						<label>Director</label>
						<input 
                        onChange={handleChange} 
                        // value={director} 
                        name="director" 
                        type="text" 
                        className="form-control"
                        />
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input 
                        onChange={handleChange} 
                        // value={genre} 
                        name="genre" 
                        type="text" 
                        className="form-control"
                        />
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input 
                        onChange={handleChange} 
                        // value={metascore} 
                        name="metascore" 
                        type="number" 
                        className="form-control"
                        />
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea 
                        onChange={handleChange} 
                        // value={description} 
                        name="description" 
                        className="form-control">

                        </textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Add Movie"/>
					<Link to={`/movies/add/:id`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
            </form>
        </div>
    </div>
);
}

export default AddMovieForm;