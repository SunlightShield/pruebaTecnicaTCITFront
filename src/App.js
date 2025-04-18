import React from 'react';
import PostForm from './component/PostForm';
import PostList from './component/PostList';
import PostFilter from './component/PostFilter';

function App() {
  return (
    <div className="App">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="card shadow-b">
              <div className="card-header">
                Prueba técnica TCIT
              </div>
              <div className="card-body">
                <PostFilter />
                <PostList />
                <PostForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
