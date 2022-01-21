import React, { useEffect, useRef, useState } from 'react'
import { Layout } from '../components';
import ReactCarousel, { AFTER, CENTER, BEFORE } from "react-carousel-animated";
import "react-carousel-animated/dist/style.css";
import { Carousel } from '../components/others/carousel';
import { ScrollDemo } from '../components/others/scroll';
import { CateCard } from '../components/others/catecard';
import Loading from '../images/loading.gif'
import axios from 'axios'

export const HomePage = () => {
  const myRef = useRef(null);
  const [allBooks, setAllBooks] = useState(null)
  const [books, setBooks] = useState(null)
  const [authorSearchValue, setAuthorSearchValue] = useState('');
  const [bookSearchValue, setBookSearchValue] = useState('');

  const images = [
    {
      src: 'https://cdn2.vectorstock.com/i/1000x1000/10/06/cover-design-brochure-with-connected-line-and-dots-vector-20631006.jpg',
    },
    {
      src: 'https://st3.depositphotos.com/14469500/19022/v/1600/depositphotos_190224684-stock-illustration-cover-design-brochure-with-connected.jpg',
    },
    {
      src: 'https://cdn2.vectorstock.com/i/1000x1000/18/06/minimalist-book-cover-design-with-connected-vector-27631806.jpg',
    }
  ]

  const unique = (data) => {
    let uniqueArr = []
    data.forEach((c) => {
      if (!uniqueArr.includes(c.author)) {
        uniqueArr.push(c.author);
      }
    });

    return uniqueArr;
  }

  useEffect(() => {
    axios.post('http://localhost:4000/', {
      query: `query books {
        books {
            _id
          title,
          author,
          body
        }
      }`
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((indx) => {

      setAllBooks(indx.data.data.books)
      setBooks(indx.data.data.books)
    })

  }, [])

  useEffect(() => {
    if (allBooks) {
      console.log('book: ', bookSearchValue)
      setBooks(allBooks.filter((e) => {
        if (e.title.split(bookSearchValue).length > 1) {
          return true;
        }
      }))
    }

  }, [bookSearchValue])

  useEffect(() => {
    if (allBooks) {
      console.log('author: ', authorSearchValue)
      setBooks(allBooks.filter((e) => {
        if (e.author.split(authorSearchValue).length > 1) {
          return true;
        }
      }))
    }

  }, [authorSearchValue])

  if (!books || !allBooks) {
    return (
      <div className='flex justify-center items-center'>
        <img src={Loading} />
      </div>
    )
  }


  console.log('books: ', books)


  const executeScroll = (author) => {
    setAuthorSearchValue(author)
    setBooks(allBooks.filter((e) => {
      if (e.author == author) {
        return true;
      }
    }))
    myRef.current.scrollIntoView()
  }

  return (<>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.css"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      rel="stylesheet"
    />
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.js"
    ></script>
    <Layout>
      <ReactCarousel
        carouselConfig={{
          transform: {
            rotateY: {
              [BEFORE]: () => "rotateY(25deg)",
              [CENTER]: () => "rotateY(0deg)",
              [AFTER]: () => "rotateY(-25deg)",
            },
          },
        }}
        itemBackgroundStyle={{
          backgroundColor: "#ece4db",
          borderRadius: "3px",
          boxShadow: "8px 12px 14px -6px black",
        }}
        containerBackgroundStyle={{
          filter: "blur(7px)",
          backgroundColor: "rgb(77, 41, 0)",
        }}
        carouselHeight="600px"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt="test"
            style={{
              height: "500px",
              borderRadius: "20px",
              boxShadow: "0 7px 20px 2px rgb(77, 41, 0)",
              margin: "1rem",
            }}
          />
        ))}
      </ReactCarousel>
      <div className='flex flex-col' ref={myRef} style={{ marginTop: 50, marginBottom: 50 }}>
        <div className='flex justify-center'>
          <div className='flex flex-col'>
            <div className='flex flex-row jusitfy-center'>
              <div className='flex flex-col justify-center'>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8789 13.248L9.69236 8.96875C10.527 7.95703 10.9443 6.79036 10.9443 5.46875C10.9443 4.47526 10.7042 3.55924 10.2241 2.7207C9.74396 1.88216 9.08883 1.21908 8.2587 0.731445C7.42857 0.243815 6.52665 0 5.55293 0C4.57922 0 3.67954 0.243815 2.85389 0.731445C2.02825 1.21908 1.37537 1.88216 0.895241 2.7207C0.415113 3.55924 0.175049 4.47526 0.175049 5.46875C0.175049 6.46224 0.415113 7.37826 0.895241 8.2168C1.37537 9.05534 2.02825 9.71842 2.85389 10.2061C3.67954 10.6937 4.58146 10.9375 5.55966 10.9375C6.89684 10.9375 8.07248 10.4909 9.08659 9.59766L13.2597 13.8633C13.3494 13.9544 13.4526 14 13.5693 14C13.6859 14 13.7869 13.9567 13.8722 13.8701C13.9574 13.7835 14 13.6787 14 13.5557C14 13.4326 13.9597 13.3301 13.8789 13.248ZM5.55966 10.0762C4.73402 10.0762 3.97345 9.86882 3.27793 9.4541C2.58242 9.03939 2.03274 8.47884 1.6289 7.77246C1.22505 7.06608 1.02313 6.29818 1.02313 5.46875C1.02313 4.63932 1.22505 3.87142 1.6289 3.16504C2.03274 2.45866 2.58242 1.89811 3.27793 1.4834C3.97345 1.06868 4.73178 0.861328 5.55293 0.861328C6.37409 0.861328 7.13242 1.06868 7.82793 1.4834C8.52345 1.89811 9.07313 2.45866 9.47697 3.16504C9.88082 3.87142 10.0827 4.63932 10.0827 5.46875C10.0827 5.82422 10.0424 6.17513 9.96159 6.52148C9.88082 6.86784 9.76639 7.19141 9.61832 7.49219C9.47024 7.79297 9.293 8.0778 9.08659 8.34668C8.88018 8.61556 8.64684 8.85482 8.38659 9.06445C8.12633 9.27409 7.84813 9.4541 7.55197 9.60449C7.25582 9.75488 6.93723 9.87109 6.5962 9.95312C6.25518 10.0352 5.90966 10.0762 5.55966 10.0762Z" fill="#241400" />
                </svg>
              </div>
              <input placeholder={'Book Name'} value={bookSearchValue} onChange={(e) => setBookSearchValue(e.target.value)} className='no-border-input' style={{ border: 'none', backgroundColor: '#E5E5E5', height: '30px', fontSize: '14px' }} />
            </div>
            <svg width="185" height="1" viewBox="0 0 200 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="0.5" x2="170" y2="0.5" stroke="#696764" strokeOpacity="0.59" />
            </svg>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row jusitfy-center'>
              <div className='flex flex-col justify-center'>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8789 13.248L9.69236 8.96875C10.527 7.95703 10.9443 6.79036 10.9443 5.46875C10.9443 4.47526 10.7042 3.55924 10.2241 2.7207C9.74396 1.88216 9.08883 1.21908 8.2587 0.731445C7.42857 0.243815 6.52665 0 5.55293 0C4.57922 0 3.67954 0.243815 2.85389 0.731445C2.02825 1.21908 1.37537 1.88216 0.895241 2.7207C0.415113 3.55924 0.175049 4.47526 0.175049 5.46875C0.175049 6.46224 0.415113 7.37826 0.895241 8.2168C1.37537 9.05534 2.02825 9.71842 2.85389 10.2061C3.67954 10.6937 4.58146 10.9375 5.55966 10.9375C6.89684 10.9375 8.07248 10.4909 9.08659 9.59766L13.2597 13.8633C13.3494 13.9544 13.4526 14 13.5693 14C13.6859 14 13.7869 13.9567 13.8722 13.8701C13.9574 13.7835 14 13.6787 14 13.5557C14 13.4326 13.9597 13.3301 13.8789 13.248ZM5.55966 10.0762C4.73402 10.0762 3.97345 9.86882 3.27793 9.4541C2.58242 9.03939 2.03274 8.47884 1.6289 7.77246C1.22505 7.06608 1.02313 6.29818 1.02313 5.46875C1.02313 4.63932 1.22505 3.87142 1.6289 3.16504C2.03274 2.45866 2.58242 1.89811 3.27793 1.4834C3.97345 1.06868 4.73178 0.861328 5.55293 0.861328C6.37409 0.861328 7.13242 1.06868 7.82793 1.4834C8.52345 1.89811 9.07313 2.45866 9.47697 3.16504C9.88082 3.87142 10.0827 4.63932 10.0827 5.46875C10.0827 5.82422 10.0424 6.17513 9.96159 6.52148C9.88082 6.86784 9.76639 7.19141 9.61832 7.49219C9.47024 7.79297 9.293 8.0778 9.08659 8.34668C8.88018 8.61556 8.64684 8.85482 8.38659 9.06445C8.12633 9.27409 7.84813 9.4541 7.55197 9.60449C7.25582 9.75488 6.93723 9.87109 6.5962 9.95312C6.25518 10.0352 5.90966 10.0762 5.55966 10.0762Z" fill="#241400" />
                </svg>
              </div>
              <input placeholder={'Author Name'} value={authorSearchValue} onChange={(e) => setAuthorSearchValue(e.target.value)} className='no-border-input' style={{ border: 'none', backgroundColor: '#E5E5E5', height: '30px', fontSize: '14px' }} />
            </div>
            <svg width="185" height="1" viewBox="0 0 200 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="0.5" x2="170" y2="0.5" stroke="#696764" strokeOpacity="0.59" />
            </svg>
          </div>
        </div>
      </div>
      <div className='flex justify-center' style={{ fontSize: 25, marginTop: 20 }}>Books</div>
      <Carousel props={books} />
      <div className='flex flex-row justify-center' style={{ fontSize: 25, fontWeight: 900, marginBottom: 20 }}>
        Authors
      </div>
      <div class="container">
        <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#multi-item-example" data-slide-to="0" class="active"></li>
            <li data-target="#multi-item-example" data-slide-to="1"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active flex" style={{ width: '100%', flexWrap: 'wrap' }}>
              {
                (unique(allBooks)).map((author, index) => {
                  return <CateCard author={author} src={null} from={() => executeScroll(author)} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>);
}
