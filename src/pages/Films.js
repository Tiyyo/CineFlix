<>
  <div className='header'
    <Navigation></Navigation>
    <SearchBar/>
  </div>
  { searchIsActive() ? (<div className="search--result"><MovieCard/></div>) :
  (
  { 
   loading ? <Loader /> : (                    
   <div classname='main--content'>
    <Trendings />
    <Lastrelease />
    <Recomandations />
    {FavoriteGenre.map((genre) => {
    return <Genre genre={genre} />
  })}                                    
   </div>)
   )                  
   }                    
   }
</>
    
    
    
    
  
  
  
