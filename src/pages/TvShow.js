<>
  <div className='header'
    <Navigation></Navigation>
    <SearchBar/>
  </div>
  { searchIsActive ? (<div className="search--result"><MovieCard/></div>) :
  (
  { 
   loading ? <Loader /> : (                    
   <div classname='main--content'>
    <Trendings>
      <BannerCard>
    </Trendings>
    <LastRelease />
    <Recomandations>
        <MovieCard/>
    </Recomandations>
    <Genre />
    <Genre />
    <Genre />                                         
   </div>)
   )                  
   }                    
   }
</>
