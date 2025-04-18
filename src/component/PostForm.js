import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/postsSlice';
import { toast } from 'react-toastify';


const PostForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.warning('Los campos son obligatorios');
      return;
    }

    try {
      const result = await dispatch(createPost({ name, description })).unwrap();
      console.log('Post creado exitosamente:', result);
      toast.success('Post creado')

      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error al crear el post:', error);
      toast.error('Error al crear el post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row align-items-end">
        <div className="col-md-4">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa el nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            placeholder="Escribe una descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-md-3 d-grid">
          <button type="submit" className="btn btn-primary mt-3">
            Agregar
          </button>
        </div>
      </div>
    </form>

  );
};

export default PostForm;
