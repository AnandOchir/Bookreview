import React from 'react'
import { Layout } from '../components'
export const BookDetail = () => {
  const Book = {
    image: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/270022958_657710078752558_1089418706817314221_n.png?_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeHRR52oIecQTw3DKjoWxt6tZAQcK1unQ0tkBBwrW6dDS6iir0PWGkyuXQiFyus8X-601ynvxLAWSb_vzqbuUvYu&_nc_ohc=r23lukbsjhYAX-BSIcf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVK6BCEis73NlpU5PtlCFE2C58J2A7d9ILKjtUWEfkgvSg&oe=620C9E48',
    title: 'Darkest Dungeon',
    author: 'Red Hooks Studio',
    body: 'It’s an exciting time to be a book reviewer. Once confined to print newspapers and journals, reviews now dot many corridors of the Internet — forever helping others discover their next great read. That said, every book reviewer will face a familiar panic: how can you do justice to a great book in just a thousand words?It’s an exciting time to be a book reviewer. Once confined to print newspapers and journals, reviews now dot many corridors of the Internet — forever helping others discover their next great read. That said, every book reviewer will face a familiar panic: how can you do justice to a great book in just a thousand words? It’s an exciting time to be a book reviewer. Once confined to print newspapers and journals, reviews now dot many corridors of the Internet — forever helping others discover their next great read. That said, every book reviewer will face a familiar panic: how can you do justice to a great book in just a thousand words? It’s an exciting time to be a book reviewer. Once confined to print newspapers and journals, reviews now dot many corridors of the Internet — forever helping others discover their next great read. That said, every book reviewer will face a familiar panic: how can you do justice to a great book in just a thousand words? It’s an exciting time to be a book reviewer. Once confined to print newspapers and journals, reviews now dot many corridors of the Internet — forever helping others discover their next great read. That said, every book reviewer will face a familiar panic: how can you do justice to a great book in just a thousand words? It’s an exciting time to be a book reviewer. Once confined to print newspapers and journals, reviews now dot many corridors of the Internet — forever helping others discover their next great read. That said, every book reviewer will face a familiar panic: how can you do justice to a great book in just a thousand words?',
    comments: [{ body: '' }],
    // date: { type: Date, default: Date.now }
  }
  const Comments = [
    {
      user: 'anand',
      body: 'zedude suga zedude suga zedude suga zedude suga zedude suga zedude suga zedude suga zedude suga zedude suga zedude suga zedude suga zedude suga',
      date: { type: Date, default: Date.now },
    },
    {
      user: 'anand',
      body: 'zedude suga',
      date: { type: Date, default: Date.now },
    },
    {
      user: 'anand',
      body: 'zedude suga',
      date: { type: Date, default: Date.now },
    },
    {
      user: 'anand',
      body: 'zedude suga',
      date: { type: Date, default: Date.now },
    },
    {
      user: 'anand',
      body: 'zedude suga',
      date: { type: Date, default: Date.now },
    },
  ]
  const CommentCard = (x) => {
    console.log(x)
    return (
      <div className='Comment'>
        <div className='fs-24px'>{x.user} : <div>{Date.now}</div></div>
        {x.body}
      </div>
    )
  }
  return (
    <Layout>
      <div className='full-screen'>
        <div className='Dynamic-Column'>
          <div className='Book-review-image-container flex-center mt-5'>
            <img src={Book.image} className='Book-review-image' />
          </div>
          <div className='Book-review-detail pa-5 mb-3' >
            <div className='fs-36 mb-3'>{Book.title}</div>
            <div className='fs-24 mb-3'>
              Author:<a href={`http://localhost:3000/auth=${Book.author}`}>{Book.author}</a>
            </div>
            <div className='fs-16' style={{ width: '80%' }}>
              <div className='line mb-3' />
              {Book.body}
            </div>
          </div>
        </div>
        <div className='Comments-box pa-5'>
          <div className='line mb-3' style={{ width: '95%' }} />
          COMMENTS:{Comments.map((comment) => CommentCard(comment))}
        </div>
      </div>
    </Layout>
  );
}
