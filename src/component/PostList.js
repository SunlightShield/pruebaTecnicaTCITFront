import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';
import { toast } from 'react-toastify';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.filteredPosts);
    const status = useSelector((state) => state.posts.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deletePost(id));
         toast.success('post '+ '' + id + ''+ ' eliminado');

    };

    return (
        <div>
            <table className="table table-striped table-bordered rounded-3 overflow-hidden ">
                <thead className="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">No hay posts</td>
                        </tr>
                    ) : (
                        posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.name}</td>
                                <td>{post.description}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default PostList;
