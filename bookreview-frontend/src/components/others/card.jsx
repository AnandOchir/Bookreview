import React from 'react';
import { useNavigate} from 'react-router-dom'
export const Card = ({ src, author, title, text, to, Book}) => {
    const navigate = useNavigate()
    return (<>
        <div class="col-md-4 w-30 p-3" style={{ float: 'left'}} ref={to}>
            <div class="card mb-2" style={{boxShadow: '8px 8px 5px gray' }}>
                <img class="card-img-top" style={{width: '100%', height: '300px'}}
                    src={src} alt="Card image cap" />
                <div class="card-body">
                    <h4 class="card-title">{title}</h4>
                    <p class="card-text">{text.slice(0,250)}{text.length > 250 && ' ...'}</p>
                    <p class="card-text">author: {author}</p>
                    <a class="btn btn-primary" onClick={()=>{navigate('book-detail',{state:Book})}}>More</a>
                </div>
            </div>
        </div>
    </>)
}