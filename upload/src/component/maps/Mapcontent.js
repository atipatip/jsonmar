import React, { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { create, list } from "../maps/functions/travel";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Mapcontent = () => {
  const [position, setPosiotion] = useState(null);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(()=>{
    //code
    loadData();
  },[])

  const loadData = ()=> {
    list()
    .then((res)=>{
        setData(res.data);
        // console.log(res.data.market)
    })
    .catch((err)=>console.log(err.toJSON()));
  }

  // const LocationMarker = () => {
  //   const map = useMapEvent({
  //     click(e) {
  //       console.log(e.latlng);
  //       map.flyTo(e.latlng, 10);
  //       setPosiotion(e.latlng);
  //       setForm({
  //         ...form,
  //         lat: e.latlng.lat,
  //         lng: e.latlng.lng,
  //       });
  //     },
  //   });

  //   return 
  // };

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    create(form).then((res) => {
      console.log(res);
    })
    .catch((err)=>console.log(err))
  };
  return (
    <div className="row">
      <div className="col-md-10">
        <MapContainer center={[13.768679, 100.551333]} zoom={10} style={{ height: "100vh" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[13, 100]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}

          {/* Event */}
          {/* <LocationMarker /> */}

          {data 
          ? data.map((item, i)=>
          <Marker position={[item.marketlatitude,item.longitude]} key={i}>
            <Popup>
            <span>ชื่อ :</span>{item.marketname_th} <br />
                {item.district} <br />
                {item.subdistrict}
            </Popup>

          </Marker>
          ) 
          : null}

            


        </MapContainer>
      </div>

      <div className="col-md-2">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="name"
              onChange={(e) => handleOnChange(e)}
              type="Text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Detail</label>
            <input
              name="detail"
              onChange={(e) => handleOnChange(e)}
              type="Text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lat</label>
            <input
              name="lat"
              value={form.lat}
              onChange={(e) => handleOnChange(e)}
              type="Text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Long</label>
            <input
              name="lng"
              value={form.lng}
              onChange={(e) => handleOnChange(e)}
              type="Text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Mapcontent;
