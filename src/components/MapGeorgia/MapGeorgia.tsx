"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { LazyMotion, m, useInView, Variants } from "framer-motion";
import { FeatureCollection } from "geojson";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

import styles from "./MapGeorgia.module.css";

import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";

interface City {
  name: string;
  coordinates: [number, number];
}

const cities: City[] = [
  { name: "Tbilisi", coordinates: [44.7833, 41.7167] },
  { name: "Batumi", coordinates: [41.6333, 41.6333] },
  { name: "Kutaisi", coordinates: [42.7, 42.2667] },
];

const mapVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const GeorgiaMap = () => {
  const [countryData, setCountryData] = useState<FeatureCollection | null>(null);
  const [regionsData, setRegionsData] = useState<FeatureCollection | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [projectedCities, setProjectedCities] = useState<{ name: string; x: number; y: number }[]>([]);
  const [showCities, setShowCities] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobileView = useScreenWidthDetect(600);
  const mapInView = useInView(wrapperRef, { once: true, amount: 0.5 });

  useEffect(() => {
    // Load country boundaries
    d3.json<FeatureCollection>("/geoBoundaries-GEO-ADM0_simplified.geojson")
      .then((data) => {
        if (data) {
          setCountryData(data);
        }
      })
      .catch((error) => console.error("Error loading country GeoJSON:", error));

    // Load region boundaries
    d3.json<FeatureCollection>("/geoBoundaries-GEO-ADM1_simplified.geojson")
      .then((data) => {
        if (data) {
          setRegionsData(data);
        }
      })
      .catch((error) => console.error("Error loading regions GeoJSON:", error));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const wrapperHeight = isMobileView ? 240 : 480;
        setDimensions({
          width: wrapperWidth,
          height: wrapperHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [isMobileView]);

  useEffect(() => {
    if (countryData && regionsData && svgRef.current && dimensions.width > 0 && dimensions.height > 0) {
      const svg = d3.select(svgRef.current);

      svg.selectAll("*").remove();

      const projection = d3
        .geoMercator()
        .fitSize([dimensions.width, dimensions.height], countryData)
        .center([43.3, 42])
        .scale(dimensions.width * 7);

      const path = d3.geoPath().projection(projection);

      // Draw regions
      svg
        .append("g")
        .selectAll("path")
        .data(regionsData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "rgb(0, 0, 0, 0.3)")
        .attr("stroke-width", 0.5);

      // Draw country border
      svg
        .append("g")
        .selectAll("path")
        .data(countryData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "rgb(0, 0, 0, 0.5)")
        .attr("stroke-width", 1);

      const newProjectedCities = cities.map((city) => ({
        name: city.name,
        x: projection(city.coordinates)![0],
        y: projection(city.coordinates)![1],
      }));

      setProjectedCities(newProjectedCities);
      setTimeout(() => setShowCities(true), 1000);
    }
  }, [countryData, regionsData, dimensions]);

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={wrapperRef} className={styles.wrapper}>
        <m.svg
          ref={svgRef}
          width='100%'
          height='100%'
          viewBox={`0 0 ${dimensions.width} ${isMobileView ? dimensions.height : "410"}`}
          preserveAspectRatio='xMidYMid meet'
          variants={mapVariants}
          initial='hidden'
          animate={mapInView ? "show" : "hidden"}
        >
          {showCities &&
            projectedCities.map((city, index) => (
              <m.g
                key={city.name}
                initial={{ scale: 0 }}
                animate={{ scale: mapInView ? 1 : 0 }}
                transition={{ delay: index * 0.8 }}
              >
                <m.circle
                  key={city.name + "circle"}
                  cx={city.x}
                  cy={city.y}
                  r={isMobileView ? 3 : 5}
                  fill='#6d309d'
                  initial={{ scale: 0 }}
                  animate={{ scale: mapInView ? 1 : 0 }}
                  transition={{ delay: index * 0.8, duration: 0.5 }}
                />
                <m.text
                  key={city.name + "text"}
                  x={city.x}
                  y={city.y - dimensions.height * 0.025}
                  textAnchor='middle'
                  fill='black'
                  fontSize={isMobileView ? `${dimensions.width * 0.05}px` : `${dimensions.width * 0.02}px`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: mapInView ? 1 : 0 }}
                  transition={{ delay: index * 0.8 + 0.25, duration: 0.5 }}
                >
                  {city.name}
                </m.text>
              </m.g>
            ))}
        </m.svg>
      </section>
    </LazyMotion>
  );
};

export default GeorgiaMap;
