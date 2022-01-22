import React from 'react';
import { Card } from './card';

export const Carousel = (props) => {
    const data = props.props
    console.log('images: ', data)
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
        {/* <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
            <div class="controls-top">
                <a class="btn-floating" href="#multi-item-example" data-slide="prev"><i class="fas fa-chevron-left"></i></a>
                <a class="btn-floating" href="#multi-item-example" data-slide="next"><i
                    class="fas fa-chevron-right"></i></a>
            </div>
            <ol class="carousel-indicators">
                <li data-target="#multi-item-example" data-slide-to="0" class="active"></li>
                <li data-target="#multi-item-example" data-slide-to="1"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                    
                </div>
            </div>
        </div> */}
        <div class="container">
            <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#multi-item-example" data-slide-to="0" class="active"></li>
                    <li data-target="#multi-item-example" data-slide-to="1"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active flex" style={{ width: '100%', flexWrap: 'wrap'}}>
                        {data.map((book, index) => (
                            <Card src={`/images/book-images/book-${book._id}.${book.bookImageType}`} text={book.body} title={book.title} key={index} author={book.author} to={null}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

