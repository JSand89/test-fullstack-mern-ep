import { Request, Response } from 'express';
import {  MongoClient } from "mongodb";
import Song from '../domain/entities/song_entitie';


const getAll = async (request: Request, response: Response) => {
    const client = new MongoClient(`mongodb+srv://educamas:${process.env.PASSWORDDB}@cluster0.d6guj1r.mongodb.net/?retryWrites=true&w=majority`);
    try {
        console.info('consulting DB')
        const database = client.db("song-test");
        const cursor =  database.collection("Songs").find().project({_id : 0, name:1,artist:1,gender:1})     
        const info = await cursor.toArray()
        response.json(info)
    } catch (error) {
        console.error(error);
    }finally{
        await client.close();
    }
}

const insertSong =async (request:Request,response:Response) => {
    const client = new MongoClient(`mongodb+srv://educamas:${process.env.PASSWORDDB}@cluster0.d6guj1r.mongodb.net/?retryWrites=true&w=majority`);
    const {body}=request;
    const song:Song ={
        name: typeof body.name === "string" ? body.name : 'name not found',
        artist: typeof body.artist === 'string' ? body.artist : 'artist not found',
        gender: typeof body.gender ==="object" ? body.gender:["no gender add"]
    }
    console.log(song)

    try {
        const database = client.db("song-test");
        const collection = database.collection<Song>("Songs");
        const result = await collection.insertOne(song);
        response.json({info:"insert correct?"})
        console.log(`information inserted with the id: ${result.insertedId}`)
    } catch (error) {
        console.error(error);
    }finally{
        await client.close();
    }
}

const filter = async (request:Request,response:Response) => {
    const client = new MongoClient(`mongodb+srv://educamas:${process.env.PASSWORDDB}@cluster0.d6guj1r.mongodb.net/?retryWrites=true&w=majority`);
    const {query}=request;
    console.log(query);
try {
    const database = client.db("song-test");
    const cursor =  database.collection("Songs")
    .find({$or:[{name:query.info},{artist:query.info},{gender:query.info}]})
    .project({_id : 0, name:1,artist:1,gender:1})     
    const info = await cursor.toArray()
    if(info.length==0){
        response.json({info:"Song not found"});
        response.status(204);
    }  else{
        response.json(info);
        response.status(200)
    }
    console.log(info)
    
} catch (error) {
    console.error(error);
}finally{
    await client.close();
}
}

const songsController = {getAll,insertSong,filter}
export default songsController


