import React from 'react';
import { useDispatch } from 'react-redux';
import { filterPostsByName } from '../redux/postsSlice';

const PostFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const search = e.target.value;
    dispatch(filterPostsByName(search));
  };

  return (

    <div className="mb-3">
    <label className="form-label">Filtrar por nombre</label>
    <input
      type="text"
      className="form-control"
      placeholder="Ingresa el nombre"
      onChange={handleChange}
    />
  </div>
  );
};

export default PostFilter;
