import React from 'react';
import { Avatar, Rate } from 'antd';
import './CommentStyle.scss';
import { UserOutlined } from '@ant-design/icons';

const CommentComponent = ({ content, rating }) => {
   return (
      <div className="comment-container">
         <Avatar size={48} icon={<UserOutlined />} />
         <div className="comment-content">
            <p className="comment-text">{content}</p>
            <div className="comment-rating">
               <Rate disabled defaultValue={rating} />
               {/* <span className="rating-text">{rating}</span> */}
            </div>
         </div>
      </div>
   );
};

export default CommentComponent;
