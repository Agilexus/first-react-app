import React, {useEffect, useMemo, useState} from 'react';
import ReactDOM from 'react-dom/client';
import app from './App';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';

function App() {

/* Масив який раніше використовували для мока
 {id:1, title:'аа 1', body:'бб'},
  {id:2, title:'гг 2', body:'аа'},
  {id:3, title:'вв 3', body:'яя'}
*/    
const [posts, setPosts] = useState([]);

const [filter, setFilter] = useState({sort: '', query: ''})
const [modal, setModal] = useState(false);

// кастомний хук
const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
const [isPostsLoading, setIsPostsLoading] = useState(false)

useEffect(() => {
  fetchPosts()
}, [])

/*отримуємо дані з керованого інпуту
const [post, setPost] = useState({title:'', body:''})
закоментував бо стейт більше не використувається після того як форму переніс в окремий компонент
*/

const createPost = (newPost) => {
  setPosts([...posts, newPost])
  setModal(false)
}

async function fetchPosts() {
  setIsPostsLoading(true);
  setTimeout(async () => {
    const posts = await PostService.getAll();
    setPosts(posts)
    setIsPostsLoading(false)

  }, 1000)
  
}

//отримуємо post  із дочірнього компоненту
const removePost = (post) => {
   setPosts(posts.filter(p => p.id !== post.id))
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
      
      {isPostsLoading
        ? <h1>Пошук...</h1>
        :  <PostList 
            remove={removePost} 
            posts={sortedAndSearchedPosts} 
            title='Пости про JS' 
          />
      }
    
    </div>
  );
}

export default App;
