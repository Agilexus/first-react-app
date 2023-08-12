import React, { useEffect, useRef, useState } from 'react';

import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import '../styles/App.css';
import { getPageCount } from '../utils/page';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import Pagination from '../components/UI/pagination/pagination.jsx';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


function Posts() {

/* Масив який раніше використовували для мока
 {id:1, title:'аа 1', body:'бб'},
  {id:2, title:'гг 2', body:'аа'},
  {id:3, title:'вв 3', body:'яя'}
*/    
const [posts, setPosts] = useState([]);

const [filter, setFilter] = useState({sort: '', query: ''})
const [modal, setModal] = useState(false);
const [totalPages, setTotalPages] = useState(0)
const [limit, setLimit] = useState(5)
const [page, setPage] = useState(1)
// кастомний хук
const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
const lastElement = useRef();




const [fetchPosts, isPostsLoading, postError] = useFetching (async (limit, page) => {
  const response = await PostService.getAll(limit, page);
  setPosts([...posts, ...response.data])
  const totalCount = response.headers['x-total-count']
  setTotalPages(getPageCount(totalCount, limit));
})

useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  setPage(page + 1);
})

useEffect(() => {
  fetchPosts(limit, page)
}, [page, limit])

/*отримуємо дані з керованого інпуту
const [post, setPost] = useState({title:'', body:''})
закоментував бо стейт більше не використувається після того як форму переніс в окремий компонент
*/

const createPost = (newPost) => {
  setPosts([...posts, newPost])
  setModal(false)
}

//отримуємо post  із дочірнього компоненту
const removePost = (post) => {
   setPosts(posts.filter(p => p.id !== post.id))
}

const changePage = (page) => {
  setPage(page)
}

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Додати пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
      <div style={{ textAlign: 'right' }}>
        <MyButton onClick={() => setModal(false)}>X</MyButton>
       </div>
      
        <PostForm create={createPost} />
      </MyModal>
     
      <hr style={{margin: '32px 0 16px 0'}} />

      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кількість потів на сторінці"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Всі'},
        ]}
      />
      
      {postError && 
        <h1>Виникла помилка ${postError}</h1>
      }
      <PostList 
            remove={removePost} 
            posts={sortedAndSearchedPosts} 
            title='Пости про JS' 
          />
      
      <div ref={lastElement} style={{ height: 20, background: 'red' }} />
      {isPostsLoading &&
        <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
      }
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages} />
    </div>
  );
}

export default Posts;
