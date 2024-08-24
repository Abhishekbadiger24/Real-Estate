
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import {Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const posts = useLoaderData()
  // const posts = data.postResponse

 console.log(posts)


  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        {posts.data.map(item=>(
          <Card key={item.id} item={item}/>
        ))}

        {/* <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error loading posts!</p>
          }
        >

             {(postResponse) => (
              postResponse.data.map( post => {
                console.log(post);
                <Card key={post.id} item={post}/>
  
              })
  
            )}

      
        </Await>
        </Suspense> */}
      </div>
    </div>
    <div className="mapContainer">
    {/* <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error loading posts!</p>
          }
        >
          {(postResponse) => ( */}
            <Map items={posts.data}/>
          {/* )}
        </Await>     
        </Suspense> */}
    </div>
  </div>;
}

export default ListPage;
