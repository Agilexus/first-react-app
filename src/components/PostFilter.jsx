import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) => {
  return (
    <div> 
        <MyInput
          value = {filter.query}
          onChange = {e => setFilter({...filter, query: e.target.value})}
          placeholder="Пошук..."
          >

          </MyInput>

        <MySelect 
          value={filter.sort}
          /* Щоб просто показати що користувач обрав, можна onChange={sort => setSelectedSort(sort)}, але у нас після вибору ще є дія сортування, тому викликаємо функцію */
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Сортувати"
          options={[
            {value: 'title', name: 'По назві'},
            {value: 'body', name: 'По опису'}
          ]}
        />
      </div>

  )
}

export default PostFilter
