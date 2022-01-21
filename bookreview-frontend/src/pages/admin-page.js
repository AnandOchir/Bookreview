import React, { useState, useRef } from 'react'
import axios from 'axios'
import FormData from 'form-data'

export const AdminPage = () => {
    const [title, setTitle] = useState('a')
    const [author, setAuthor] = useState('a')
    const [body, setBody] = useState('a')
    const [authorImage, setAuthorImage] = useState('')
    const [file, setFile] = useState('');
    const [authorFile, setAuthorFile] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [authorImageSrc, setAuthorImageSrc] = useState('');
    const inputFile = useRef(null), authorInputFile = useRef(null);


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

    const addBook = async () => {
        if (file != '') {
            const convertedBookFile = await toBase64(file);
            const convertedAuthorFile = await toBase64(authorFile);

            console.log('author: ', convertedAuthorFile)

            const data = await axios.post('http://localhost:4000/', {
                query: `mutation addBook($title: String, $author: String, $body: String, $image: String, $authorImage: String) {
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

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col'>
            <div>Addbook</div>
            <div>            
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
        </div>
    );
}
