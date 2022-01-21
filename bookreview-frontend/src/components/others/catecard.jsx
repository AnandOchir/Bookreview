import React from 'react';
import AuthorProfile from '../../images/author1.jpg';

export const CateCard = ({ author, from, img }) => {
    console.log('author: ', author);
    return (<>
        <div class="col-md-4 w-30 p-3" style={{ float: 'left' }} onClick={from}>
            <div class="card mb-2" style={{ boxShadow: '0px 4px 11px rgb(0, 0, 1)', borderRadius: 10, backgroundColor: '#fff' }}>
                <img class="card-img-top" style={{width: '100%', height: '300px'}}
                    src={img} alt="Card image cap" />
                <div class="card-body">
                    <div class="card-title" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{author}</div>
                </div>
            </div>
        </div>
    </>)
}