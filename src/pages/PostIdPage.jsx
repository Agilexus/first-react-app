import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader';



const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostsById(params.id);
        fetchComments(params.id);
    }, []);

  return (
    <div>
        
      <h1>Пост №{params.id}</h1>
      {isLoading ? (
        <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
      ) : (
        <div>{post && `${post.id}. ${post.title}`}</div>
  
      )}

      <h1>
        Коментарі
      </h1>
      {isComLoading ? (
        <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
      ) : (
        <div>
              {comments.map((comm) => (  
            <div style={{ marginTop: '15px' }} key={comm.id}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
  
      )}

    </div>
  )
}

export default PostIdPage
