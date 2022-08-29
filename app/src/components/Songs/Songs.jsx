import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


function Songs() {
    const initialState = [{
        name: "",
        artist: "",
        gender: [""]
    }];
    const [Songs, setSongss] = useState([initialState]);
    const [search, setSearch] = useState("");
    const [next, setNext] = useState(0);
/////////////////////////axios controllers/////////////////////////
//ToDO: past this to controlleSongs.js
    useEffect(() => {
        //ToDo:change in the backend to consult from next-5 to next and change the end point in this part of the code
        axios.get(`http://localhost:8080`)
            .then(res => {
                if (res.data.length>0){
                    let data = res.data.slice(next, next + 5)
                    console.log(data)
                    setSongss(data)
                }else{
                    console.log("check conection DB")
                }

            }).catch(error => { console.error(error) })
    }, [next]);

    const searchForFilter = () => {
        if (search.length > 0){
            axios.get(`http://localhost:8080/searchsong?info=${search}`)
            .then(res => {
                if (res.data.length>0){
                    let data = res.data.slice(next, next + 5)
                    console.log(data)
                    setSongss(data)
                }else{
                    console.log("no song found")// ToDO: Put a alert
                }

            }).catch(error => { console.error(error) })
        }
    }
/////////////////////////button controllers/////////////////////////
    const searchChange = e => {
        console.log(e.target.value)
        setSearch(e.target.value);
    }

    const addPages = () => {
        setNext(next + 5)
        console.log(next)
    }
    const subtractPages = () => {
        if (next === 0) {
            setNext(0)
        } else {
            setNext(next - 5)
        }
        console.log(next)
    }

    const selectSong = e => {
        console.log(e.target.innerText)
    }
    return (

        <div style={{ padding: '5%', margin: '0 5%' }}>
            <div className="containerInput">
                <input
                    className="form-control inputBuscar"
                    value={search}
                    placeholder="Búsqueda"
                    onChange={searchChange}
                />
                <button className="btn btn-success"
                onClick={searchForFilter}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cancion</th>
                                <th>Artista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Songs.map((song, index) => (
                                <tr key={index}>
                                    <td>{index + 1 + next}</td>
                                    <td>
                                        <Link to ={`/song?song=${song.name}`}
                                            >
                                            {song.name}
                                        </Link>
                                    </td>
                                    <td>{song.artist}</td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                    <button onClick={subtractPages}>anterior</button>
                    <button onClick={addPages}>siguiente</button>
                </div>
            </div>
        </div>

    );
}

export default Songs;
