import  axios  from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import SearchItems from './SearchItems';
import { useNavigate } from "react-router-dom";
const Search = () => {
    const [search,setSearchString] = useState('');
    const [searchResult,setSearchResult] = useState([]);
    const [showSearch,setShowSearch] = useState(false);

    useEffect(()=>{
        const fetchSearch = async ()=>{
            try{
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/post/search/${search}`);
                setSearchResult(result.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchSearch();
    },[search]) 

    const handleSearch= (e)=> {setSearchString(e.target.value)}
    
    const searchInput = useRef(null);
    
    const nav = useNavigate();
    let selectedItem = null;
    
    const handleKeyUp = (e)=>{
        e.preventDefault();
        setShowSearch(true);
        const items = document.querySelectorAll('.search-li')
        let index = Array.from(items).indexOf(selectedItem);
        if (selectedItem)  
            selectedItem?.classList?.remove('selected');

        if(e.key === 'ArrowDown')
            index = (index + 1) % items.length;
        else if (e.key === 'ArrowUp') 
            index = (index - 1 + items.length) % items.length;
            selectedItem = items[index];
            selectedItem?.classList?.add('selected');
            if(e.key === "Enter"&& selectedItem){
                let selectedLink = document.querySelector('.selected a')
                nav(selectedLink.attributes['href'].value)
            }
    }
    const hideSearchResult = (e)=>{
        const classes = ['title','search-wrapper','flex']
        const matchesClass = classes.find((val)=>val === e.target.className)
        if(!matchesClass){
            setShowSearch(false);
        }
    }

    const divRef = useRef(null);
    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setShowSearch(false);
        }
    };
    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
        // Cleanup the event listener on component unmount
        document.removeEventListener('mousedown', handleClickOutside);
        };

    })
    
    return (
    <div ref={divRef} onClick={hideSearchResult} className="search-wrapper">
        <input 
        onKeyUp={handleKeyUp} 
        ref={searchInput} 
        onChange={handleSearch} value={search}
        placeholder='Search for question, course,colleague..' id='search' type="text" name="search-box"/>
        {(searchResult.students?.length > 0 || 
            searchResult.questions?.length || 
            searchResult.courses?.length) 
            && 
            showSearch && 
            (<div className="search-result">
                {searchResult.students?.length > 0 && <SearchItems setShowSearch={setShowSearch} title={'Students'} items={searchResult.students}/>}
                {searchResult.questions?.length > 0 && <SearchItems setShowSearch={setShowSearch}  title={'Questions'} items={searchResult.questions}/>}
                {searchResult.courses?.length > 0 && <SearchItems setShowSearch={setShowSearch} title={'Courses'} items={searchResult.courses}/>}
            </div>)
        }
    </div>
  )
}

export default Search