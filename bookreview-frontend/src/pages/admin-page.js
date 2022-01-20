import React, { useState, useRef } from 'react'
import axios from 'axios'
import FormData from 'form-data'

export const AdminPage = () => {
    const [title, setTitle] = useState('a')
    const [author, setAuthor] = useState('a')
    const [body, setBody] = useState('a')
    const [file, setFile] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const inputFile = useRef(null);


    const onFileChange = () => {
        setFile(inputFile.current.files[0]);
        setImageSrc(URL.createObjectURL(inputFile.current.files[0]))
        console.log('setFile: ', inputFile.current.files[0])
        console.log('setImageSrc: ', URL.createObjectURL(inputFile.current.files[0]))
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const addBook = async () => {
        if (file != '') {
            const convertedFile = await toBase64(file);

            // console.log(convertedFile)

            const data = await axios.post('http://localhost:4000/', {
                query: `mutation addBook($title: String, $author: String, $body: String, $image: String) {
                    addBook(title:$title, author:$author, body:$body, image: $image) {
                        data
                        responseStatus
                    }
                }`,
                variables: {
                    title: title,
                    author: author,
                    body: body,
                    image: convertedFile
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
        <div>
            <div>Addbook</div>
            <div>
                <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.target.value)} />
                <input value={author} placeholder={'author'} onChange={(e) => setAuthor(e.target.value)} />
                <input value={body} placeholder={'body'} onChange={(e) => setBody(e.target.value)} />
                <input onChange={() => onFileChange(0)} type='file' id='file' ref={inputFile} />
            </div>
            <img src={imageSrc} style={{ width: '200px', height: '200px' }} />
            <button onClick={addBook} >AddBook</button>
        </div>
    );
}
