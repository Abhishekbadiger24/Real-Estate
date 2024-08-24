import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { useState } from "react";

function Filter() {

  const [searchParams, setsearchParams]= useSearchParams()
  const [query, setquery] = useState({
    type:searchParams.get("type") || "",
    city:searchParams.get("city") || "",
    property:searchParams.get("property") || "",
    mincost:searchParams.get("minPrice") || "",
    maxcost:searchParams.get("maxPrice") || "",
    bedroom:searchParams.get("bedroom") || "",

  })
  console.log(query)

  const handlechange = e => {
    setquery({
      ...query,
      [e.target.name] : e.target.value
    })

  }

  const handlefilter = () => {
    setsearchParams(query)
  }

  console.log(searchParams)
  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handlechange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type"  onChange={handlechange} defaultValue={query.type}>
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property"  onChange={handlechange} defaultValue={query.property}>
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handlechange}
            defaultValue={query.mincost}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handlechange}
            defaultValue={query.maxcost}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handlechange}
            defaultValue={query.bedroom}
          />
        </div>
        <button  onClick={handlefilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
