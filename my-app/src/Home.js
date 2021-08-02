import SearchIcon from '@material-ui/icons/Search';
import { useState,useEffect } from 'react';
import './Home.css'
import axios from 'axios';
require("dotenv").config();

const  key = process.env.API_KEY;
var arr ;



const Home = ()=>{
    
    const [photos,setPhotos] = useState([]);
    const[searchInput, setSearchInput] = useState('')
    const [display, setDisplay] = useState(false);
    console.log(display,"display")
    useEffect(()=>{
        async function fetchdefault(){
            const res = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=09d770a1c3e5e480517dff043f458023&format=json&nojsoncallback=1`)
            console.log(res,"111111111111111")
          
          const imgUrls = res.data.photos.photo.map((pic)=>`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`)
         setPhotos(imgUrls)
        }

        fetchdefault()
    },[])
  

    const handleChange=(e)=>{
        arr = JSON.parse(localStorage.getItem('data'))
        setSearchInput(e.target.value);
    }

    const handleclick=(e)=>{
        arr = JSON.parse(localStorage.getItem('data'))

        arr.push(searchInput)
        localStorage.setItem('data',JSON.stringify(arr))
        console.log(e.target.value)
        async function fetchData(){
            const res = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=09d770a1c3e5e480517dff043f458023&tags=${searchInput}&format=json&nojsoncallback=1`)
                                        //  https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=29feae4e85ba959ffc0465f069c7b693&tags=cat&format=json&nojsoncallback=1&api_sig=cdc75cb4e66a1a02ebac162e09153d54
            // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bc9cb7fc262638d1c85b26618675b029&tags=dog&format=json&nojsoncallback=1&api_sig=a9c5a4fb0527fd0c51fcdfbadb3a223b
           
            console.log(res,"22222222222")
            const imgUrls = res.data.photos.photo.map((pic)=>`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`)
            setPhotos(imgUrls)
        }

        fetchData()
    }

    return(
        <div className='box1'>
            <header className = "header">
               
                <div className='headerContent'>
                    <div className='heading'>
                      <h2>Search Photos</h2>
                    </div>
                    <input id='input' onClic={()=>setDisplay(true)} onChange={handleChange} type='text' placeholder='search' list='listdata'/>
                    <button id='btn' onClick={handleclick}><SearchIcon/></button>
                    {display && (
                        <div className='autocomplete'>
                            {arr && arr.map((item, i)=>{
                                <li key = {i}>{item}</li>
                            })}
                        </div>
                    )}
                </div>
                
            </header>
            <div className='content'>
                <div className='flex-container'>
                   {photos && photos.map((photo,i)=>{
                       return <div className='box' key={i}><img id='img'src={photo ? photo : ''} alt='pics'/></div>
                   })}
            </div>

            </div>
        </div>
    )
}

export default Home

