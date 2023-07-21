import { useMemo } from 'react';

export const useSortedPosts = (posts, sort) => {

/* useMemo (callback, deps) 
callback – якась функція зворотнього виклику, обов‘язково має повертати результат якихось математичних розрахунків (приклад: вісортований або відфільтрований масив)
deps – масив залежностей, в який можна передавати змінні, поля об‘єкта і тд.
цей хук, проводить розрахунки (в нашому випадку сортує масив), запоминає результат і кешує - подобна поведінка називається меморизація
*/

    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
     }, [sort, posts])

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
      }, [query, sortedPosts]);
      /* для sortedPosts застосовуємо filter(з функцією post => яка повертає пости в яких post.title.toLowerCase().includes(searchQuery(дані в полі пошуку)).
      toLowerCase() – потрібен щоб ігнорувати нижній регістр, таким чином в поле пошуку можна писати як великим так і малими літерами */
    return sortedAndSearchedPosts;
}