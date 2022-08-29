import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Song = () => {
    const initialState = [{
        name: "test",
        artist: "",
        gender: Array ['']
    }];
    const [song, setSong] = useState([initialState]);
    let {search}= useLocation()
    let query = new URLSearchParams(search)
    let data=query.get("song")
    console.log(search)

    useEffect(() => {
        //ToDo:change in the backend to consult from next-5 to next and change the end point in this part of the code
        axios.get(`http://localhost:8080/searchsong?info=${data}`)
            .then(res => {
                console.log(res.data)
                setSong(res.data[0])
            }).catch(error => { console.error(error) })
    }, []);

    return (
        <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Cancion</th>
                                <th>Artista</th>
                            </tr>
                        </thead>
                         <tbody>
                           <tr>
                                    <td>{song.name}</td>
                                    <td>{song.artist}</td>
                                    {/* <td>{song.gender.map((e)=>{
                                        <spam>{e}</spam>
                                    })}</td> */}
                                </tr>
                        </tbody> 

                    </table>
                </div>
    );
};

export default Song;