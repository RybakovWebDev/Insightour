import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { LazyMotion, m, useInView, Variants, AnimatePresence } from "framer-motion";
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
  { name: "Kutaisi", coordinates: [42.7, 42.2667] },
  { name: "Batumi", coordinates: [41.6333, 41.6333] },
  { name: "Zugdidi", coordinates: [41.8709, 42.5088] },
];

const mapVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 3, delay: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const GeorgiaMap = () => {
  const [countryData, setCountryData] = useState<FeatureCollection | null>(null);
  const [regionsData, setRegionsData] = useState<FeatureCollection | null>(null);
  const [projectedCities, setProjectedCities] = useState<{ name: string; x: number; y: number }[]>([]);
  const [showCities, setShowCities] = useState(false);
  const [linePathData, setLinePathData] = useState("");
  const [lineKey, setLineKey] = useState(0);
  const [isInitialPath, setIsInitialPath] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobileView = useScreenWidthDetect(600);
  const mapInView = useInView(wrapperRef, { once: true, amount: 0.5 });

  useEffect(() => {
    d3.json<FeatureCollection>("/geoBoundaries-GEO-ADM0_simplified.geojson")
      .then((data) => {
        if (data) {
          setCountryData(data);
        }
      })
      .catch((error) => console.error("Error loading country GeoJSON:", error));

    d3.json<FeatureCollection>("/geoBoundaries-GEO-ADM1_simplified.geojson")
      .then((data) => {
        if (data) {
          setRegionsData(data);
        }
      })
      .catch((error) => console.error("Error loading regions GeoJSON:", error));
  }, []);

  const dimensions = useMemo(() => {
    if (wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const wrapperHeight = isMobileView ? 240 : 520;
      return {
        width: wrapperWidth,
        height: wrapperHeight,
      };
    }
    return { width: 0, height: 0 };
  }, [isMobileView, wrapperRef.current?.offsetWidth]);

  useEffect(() => {
    if (countryData && regionsData && svgRef.current && dimensions.width > 0 && dimensions.height > 0) {
      const svg = d3.select(svgRef.current);

      svg.selectAll("*").remove();

      const projection = d3
        .geoMercator()
        .fitSize([dimensions.width, dimensions.height], countryData)
        .center([43.3, 42])
        .scale(dimensions.width * (isMobileView ? 7.5 : 8));

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
    }
  }, [countryData, regionsData, dimensions]);

  useEffect(() => {
    if (mapInView && projectedCities.length > 0) {
      // Delay showing cities and initial path
      setTimeout(() => {
        setShowCities(true);
        setLinePathData(generateInitialPath(projectedCities));
        setLineKey((prevKey) => prevKey + 1);
      }, 1000);
    }
  }, [mapInView, projectedCities]);

  const generateInitialPath = (cities: { x: number; y: number }[]) => {
    return `M${cities.map((city) => `${city.x},${city.y}`).join(" L")}`;
  };

  const generateRandomPath = () => {
    const shuffled = [...projectedCities].sort(() => Math.random() - 0.5);
    return `M${shuffled.map((city) => `${city.x},${city.y}`).join(" L")}`;
  };

  useEffect(() => {
    if (mapInView && projectedCities.length > 0 && showCities) {
      const initialDelay = 4500; // seconds for initial path to complete
      const updateInterval = 5000; // seconds between updates

      const updatePath = () => {
        setLinePathData(generateRandomPath());
        setLineKey((prevKey) => prevKey + 1);
      };

      // Set up interval for random paths after initial delay
      const timeout = setTimeout(() => {
        setIsInitialPath(false);
        updatePath();
        const interval = setInterval(updatePath, updateInterval);
        return () => clearInterval(interval);
      }, initialDelay);

      return () => clearTimeout(timeout);
    }
  }, [mapInView, projectedCities, showCities]);

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
          <AnimatePresence mode='wait'>
            {showCities && mapInView && (
              <m.path
                key={lineKey}
                d={linePathData}
                fill='none'
                stroke='#6d309d'
                strokeWidth={1}
                strokeDasharray='5,5'
                variants={lineVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              />
            )}
          </AnimatePresence>
          {showCities &&
            projectedCities.map((city, index) => (
              <m.g
                key={city.name}
                initial={{ scale: 0 }}
                animate={{ scale: mapInView ? 1 : 0 }}
                transition={{ delay: index * 0.8 }}
              >
                <m.circle
                  cx={city.x}
                  cy={city.y}
                  r={isMobileView ? 3 : 5}
                  fill='#6d309d'
                  initial={{ scale: 0 }}
                  animate={{ scale: mapInView ? 1 : 0 }}
                  transition={{ delay: index * 0.8, duration: 0.5 }}
                />
                <foreignObject
                  x={city.x - 40}
                  y={city.y - dimensions.height * 0.05 - (isMobileView ? 25 : 15)}
                  width={isMobileView ? 55 : 80}
                  height={isMobileView ? 25 : 30}
                >
                  <m.div
                    className={styles.cityLabel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: mapInView ? 1 : 0 }}
                    transition={{ delay: index * 0.8 + 0.25, duration: 0.5 }}
                  >
                    {city.name}
                  </m.div>
                </foreignObject>
              </m.g>
            ))}
        </m.svg>
      </section>
    </LazyMotion>
  );
};

export default GeorgiaMap;
