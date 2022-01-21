import React from 'react';

export const Card = ({ src, author, title, text, to }) => {
    return (<>
        <div class="col-md-4 w-30 p-3" style={{ float: 'left'}} ref={to}>
            <div class="card mb-2" style={{boxShadow: '8px 8px 5px gray' }}>
                <img class="card-img-top" style={{width: '100%', height: '300px'}}
                    src={src} alt="Card image cap" />
                <div class="card-body">
                    <h4 class="card-title">{title}</h4>
                    <p class="card-text">{text}</p>
                    <p class="card-text">author: {author}</p>
                    <a class="btn btn-primary">More</a>
                </div>
            </div>
        </div>
    </>)
}