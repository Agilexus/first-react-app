import React from 'react';

const PostItem = () => {
   return (
    <div className = "post">
        <div className = "post___content">
            <strong>1. Javascript</strong>
            <div>
                Javascript -  це мова програмування
            </div>
        </div>
    <div className = "post__btns">
      <button>Видалити</button>
    </div>
   </div>
   );
};

export default PostItem;