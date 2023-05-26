'use client'
import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import styled from 'styled-components'
import Loader from './Loader';
import HandLoader from './HandLoader';

const StyledDiv = styled.div`
   padding:10px;
   display:grid;
   grid-template-columns:1fr 1fr 1fr;
   gap:20px;

   

@media screen and (max-width: 950px) {
  display:grid;
   grid-template-columns:1fr 1fr;
   gap:20px;

  }
  
@media screen and (max-width: 600px) {
  display:grid;
   grid-template-columns:1fr;
   gap:20px;

  }


`;

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}

    </>
  )

}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);


    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 100)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  if (loading)
    return (
      <HandLoader />
    )


  return (
    <section className='bg-slate-100 flex flex-col gap-10 '>
      <form className='mx-auto'>
        <input
          type='text'
          className='border-2 border-yellow-400 rounded-full px-10 py-2 shadow-md mt-4 w-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 '
          placeholder='Search !'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <StyledDiv>
        {searchText ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        )}
      </StyledDiv>


    </section>
  )
}

export default Feed