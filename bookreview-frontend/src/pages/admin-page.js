import React, { useState, useRef } from 'react'
import axios from 'axios'

export const AdminPage = () => {
    const [title, setTitle] = useState('image test 1')
    const [author, setAuthor] = useState('image test 1')
    const [body, setBody] = useState('image test 1')
    const [file, setFile] = useState('');
    const [authorFile, setAuthorFile] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [authorImageSrc, setAuthorImageSrc] = useState('');
    const inputFile = useRef(null), authorInputFile = useRef(null);
    const [bookId, setBookId] = useState('');
    const user = localStorage.getItem('user')


    const onFileChange = () => {
        setFile(inputFile.current.files[0]);
        setImageSrc(URL.createObjectURL(inputFile.current.files[0]))
        console.log('setFile: ', inputFile.current.files[0])
        console.log('setImageSrc: ', URL.createObjectURL(inputFile.current.files[0]))
    }

    const onAuthFileChange = () => {
        setAuthorFile(authorInputFile.current.files[0]);
        setAuthorImageSrc(URL.createObjectURL(authorInputFile.current.files[0]))
        console.log('setAuthFile: ', authorInputFile.current.files[0])
        console.log('setAuthImageSrc: ', URL.createObjectURL(authorInputFile.current.files[0]))
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const checkType = async file => {
        const convertedFile = await toBase64(file);
        const isImage = convertedFile.split('data:image/')[1]

        const extensionType = ['jpeg', 'jpg', 'png'];

        if(isImage) {
            const type = isImage.split(';')[0]
            extensionType.map((etype) => {
                if(etype != type) {
                    return false;
                }
            })
            console.log('type: ', type)
            return {
                iType: type,
                file: convertedFile
            };          
        } else {
            console.log('its not image ')
            return false;
        }
    }

    const addBook = async () => {
        if (file != '') {
            const convertedBookFile = await checkType(file);
            const convertedAuthorFile = await checkType(authorFile);

            if(!convertedAuthorFile || !convertedBookFile) {
                alert('file not valid')
                return false
            }

            console.log('aa: ', convertedBookFile)
            console.log('author: ', convertedAuthorFile)

            const data = await axios.post('http://localhost:4000/', {
                query: `mutation addBook($title: String, $author: String, $body: String, $image: imageInputType, $authorImage: imageInputType) {
                    addBook(title:$title, author:$author, body:$body, image: $image, authorImage: $authorImage) {
                        data
                        responseStatus
                    }
                }`,
                variables: {
                    title: title,
                    author: author,
                    body: body,
                    image: convertedBookFile,
                    authorImage: convertedAuthorFile
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('data: ', data)
        } else {
            alert('Please Select File first');
        }
    }

    const deleteBook = async () => {
        if(bookId != '') {
            const data = await axios.post('http://localhost:4000/', {
                query: `mutation deleteBook($bookId: String) {
                    deleteBook(bookId: $bookId) {
                        data
                        responseStatus
                    }
                }`,
                variables: {
                    bookId: bookId
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if(data.status == "200") {
                console.log(`${bookId} book deleted`)
                alert(`${bookId} book deleted`)
            } else {
                console.log(data.responseStatus)
            }
        }
    }
    // if(!user || user.type != "admin") {
    //     return (
    //         <div>
    //             <h1>You need to login admin user</h1>
    //         </div>
    //     )
    // }

    return (
        <div>
            <div>
                <div>Addbook</div>
                <div>
                    <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.target.value)} />
                    <input value={author} placeholder={'author'} onChange={(e) => setAuthor(e.target.value)} />
                    <input value={body} placeholder={'body'} onChange={(e) => setBody(e.target.value)} />

                    <h1>author</h1>
                    <input onChange={() => onAuthFileChange(0)} type='file' id='file' ref={authorInputFile} />
                    <img src={authorImageSrc} style={{ width: '200px', height: '200px' }} />

                    <h1>book</h1>
                    <input onChange={() => onFileChange(0)} type='file' id='file' ref={inputFile} />
                    <img src={imageSrc} style={{ width: '200px', height: '200px' }} />
                </div>
                <button onClick={addBook} >AddBook</button>
            </div>
            <div>
                <h1>Delete Book</h1>
                <input value={bookId} placeholder={'book id'} onChange={(e) => setBookId(e.target.value)} />

                <button onClick={deleteBook} >Delete Book</button>
            </div>
        </div>
    );
}