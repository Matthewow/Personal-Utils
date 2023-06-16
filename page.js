"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0dGp3YW5nIiwiYSI6ImNsaXB5NDN1cTAzMnAza28xaG54ZWRrMzgifQ.cUju1vqjuW7XmAuO2iEZmg";

const createPulsingDot = (size, map) => {
  return {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },

    // Call once before every frame where the icon will be used.
    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;

      const man = new Image();
      man.src = "./man.png";

      // Draw the outer circle.
      context.clearRect(0, 0, this.width, this.height);
      context.drawImage(man, this.width / 3, this.height / 3, 50, 50);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
      context.fill();

      // Update this image's data with data from the canvas.
      this.data = context.getImageData(0, 0, this.width, this.height).data;
      map.triggerRepaint();

      // Return `true` to let the map know that the image was updated.
      return true;
    },
  };
};

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(114.1694);
  const [lat, setLat] = useState(22.3193);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // map.current.scrollZoom.disable();
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    map.current.on("load", () => {
      map.current.addImage("pulsing-dot", createPulsingDot(400, map.current), {
        pixelRatio: 2,
      });
      map.current.addSource("dot-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lng, lat], // icon position [lng, lat]
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lng + 0.01, lat + 0.01], // icon position [lng, lat]
              },
            },
          ],
        },
      });
      map.current.addLayer({
        id: "layer-with-pulsing-dot",
        type: "symbol",
        source: "dot-point",
        layout: {
          "icon-image": "pulsing-dot",
        },
      });
    });
  });

  return (
    <div className="w-screen h-screen">
      <div className="fixed top-0 left-0 right-0 bg-slate-600">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Hong Kong
      </div>
      <div className="w-screen h-screen" ref={mapContainer} />
    </div>
  );
}
