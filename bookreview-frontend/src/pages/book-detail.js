import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components";
export const BookDetail = () => {
  const { state } = useLocation();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const image="https://scontent.xx.fbcdn.net/v/t1.15752-9/270022958_657710078752558_1089418706817314221_n.png?_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeHRR52oIecQTw3DKjoWxt6tZAQcK1unQ0tkBBwrW6dDS6iir0PWGkyuXQiFyus8X-601ynvxLAWSb_vzqbuUvYu&_nc_ohc=r23lukbsjhYAX-BSIcf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVK6BCEis73NlpU5PtlCFE2C58J2A7d9ILKjtUWEfkgvSg&oe=620C9E48";
  console.log(user);
  const CommentCard = (comment, index) => {
    const day = Date(comment.date);
    return (
      <div className="Comment c-text" key={`comment-${index}`}>
        <div className="fs-24px c-gray">
          [{comment.user}] commented {day.slice(4, 15)}
        </div>
        {comment.body}
      </div>
    );
  };

  useEffect(async () => {
    const data = await axios.post(
      "http://localhost:4000/",
      {
        query: `query Query($bookId: String) {
          getBookComments(bookId: $bookId) {
              _id
              body
              user
              date
          }
        }`,
        variables: {
          bookId: state._id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    setComments(data.data.data.getBookComments);
  }, []);

  const SaveComment = async () => {
    const data = await axios.post(
      "http://localhost:4000/",
      {
        query: `mutation AddComment($bookId: String, $user: String, $body: String, $date: String) {
          addComment(bookId: $bookId, user: $user, body: $body, date: $date) {
            data
          }
        }`,
        variables: {
          bookId: state._id,
          user: user.username,
          body: comment,
          date: Date(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setComments([
      {
        bookId: state._id,
        user: user.username,
        body: comment,
        date: Date(),
      },
      ...comments,
    ]);
    setComment("");
  };

  return (
    <div>
      <div className="full-screen">
        <div className="Dynamic-Column">
          <div className="Book-review-image-container flex-center mt-5">
            <img
              src={`/images/book-images/book-${state._id}.${state.bookImageType}`}
              className="Book-review-image"
            />
          </div>
          <div className="Book-review-detail pa-5 mb-3">
            <div className="Book-detail-container justify-between mb-5" style={{ width: "90%" }}>
              <div>
                <div className="fs-36 mb-3">Book:{state.title}</div>
                <div className="fs-24 mb-3">
                  Author:
                  <a
                    onClick={() =>
                      navigate("/", { state: { author: state.author } })
                    }
                  >
                    {state.author}
                  </a>
                </div>
              </div>
              <img
                src={`/images/author-images/author-${state.authorId}.${state.authorImageType}`}
                className="Book-author-image"
              />
            </div>
            <div className="fs-16" style={{ width: "90%" }}>
              <div className="line mb-3" />
              {state.body}
            </div>
          </div>
        </div>
        {user?.username && (
          <div className="Comments-box pa-5">
            <div className="line mb-3" style={{ width: "95%" }} />
            COMMENTS:
            <div className="Comment">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="type here"
                className="Comment-input"
              />
              <button
                onClick={() => SaveComment()}
                disabled={comment ? false : true}
              >
                send
              </button>
            </div>
            {comments.map((comment, index) => CommentCard(comment, index))}
          </div>
        )}
      </div>
      <div className='Comments-box pa-5'>
        <div className='line mb-3' style={{ width: '95%' }} />
        COMMENTS:{comments.map((comment) => CommentCard(comment))}
      </div>
    </div>
  );
};
