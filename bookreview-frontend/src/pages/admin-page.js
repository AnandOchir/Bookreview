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

    const addBook = async () => {
        // const data = new FormData();
        // data.append('name', 'Image Upload');
        // data.append('file_attachment', file);
        // const data = await axios.post('http://localhost:4000/', {
        //     query: `mutation addBook($title: String, $author: String, $body: String, $image: Upload) {
        //         addBook(title:$title, author:$author, body:$body, image:$image) {
        //             filename
        //             mimetype
        //             encoding
        //         }
        //     }`,
        //     variables: {
        //         title: title,
        //         author: author,
        //         body: body,
        //         image: file
        //     }
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        const data = await axios.post('http://localhost:4000/', {
            query: `mutation singleUpload($file: Upload) {
                singleUpload(file:$file) {
                    filename
                    mimetype
                    encoding
                }
            }`,
            variables: {
                file: file
            }
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // axios.post('uploadfile', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        // })

        console.log('data: ', data)
    }

    let uploadImage = async () => {
        if (file != '') {
            let operations = `{ "query": "mutation ($file: Upload!) { singleUpload(file: $file) { filename } }", "variables": { "file": null } }`            
            const data = new FormData();
            data.append("operations", operations)
            const map = `{"0": ["variables.file"]}`
            data.append("map", map)
            data.append("0", file)

            console.log('file: ', file)

            // const res = await axios.post('http://localhost:4000/', data, {
            //     headers: {
            //         'Content-Type': 'text/plain',
            //     }
            // }).catch((err) => {
            //     console.log('err: ', err)
            // })
            
            const res = fetch('http://localhost:4000/', {
                body: data,
                method: 'post'
            }).catch((err) => {
                console.log('err: ', err)
            })
        } else {
            alert('Please Select File first');
        }
    };

    return (
        <div>
            <div>Addbook</div>
            <div>
                <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.target.value)} />
                <input value={author} placeholder={'author'} onChange={(e) => setAuthor(e.target.value)} />
                <input value={body} placeholder={'body'} onChange={(e) => setBody(e.target.value)} />
                <input onChange={() => onFileChange(0)} type='file' id='file' ref={inputFile} />
            </div>
            <img src={imageSrc} style={{width: '200px', height: '200px'}} />
            <button onClick={uploadImage} >AddBook</button>
        </div>
    );
}
