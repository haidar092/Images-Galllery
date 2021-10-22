import { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";


function App() {

  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('developer');

  useEffect(() => {
   fetch (`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
   .then(res => res.json())
   .then(data => {
     setImage(data.hits);
     setIsLoading(false);
   })
   .catch(err => console.log(err));  
   
  }, [term])
  return (
    <div className="container mx-auto ">
      <ImageSearch searchText={(text) => setTerm(text)}/>
      
      {!isLoading && image.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32"> Images Not Fount...</h1>}
      
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32"> LODING.....</h1> :<div className="grid grid-cols-3 gap-8">
        {image.map(image =>(
          <ImageCard key={image.id} image={image}/>
        ))}
      </div>}
      
    </div>
  );
}

export default App;
