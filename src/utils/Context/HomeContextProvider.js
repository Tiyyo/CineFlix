import React, {createContext} from "react" ; 

export const HomeContext = createContext(HomeContext); 

export const HomeContextProvider = ({children}) => {
  const [imageHeaderHeight, setImageHeaderHeight] = useState(500)
  
  return <HomeContextProvider value={value}>{children}</HomeContextProvider>
}

export default HomeContext;
