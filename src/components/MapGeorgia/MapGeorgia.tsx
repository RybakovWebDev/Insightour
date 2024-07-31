import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const initialPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 3.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const subsequentPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2.5, ease: "easeInOut" },
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [resizeKey, setResizeKey] = useState(0);
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);
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

  const resetAnimation = useCallback(() => {
    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
    }
    setShowCities(false);
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  const updateDimensions = useCallback(() => {
    if (wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const wrapperHeight = isMobileView ? 240 : 520;
      setDimensions({
        width: wrapperWidth,
        height: wrapperHeight,
      });
      setResizeKey((prev) => prev + 1);
      resetAnimation();
    }
  }, [isMobileView, resetAnimation]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const drawMap = useCallback(() => {
    if (countryData && regionsData && svgRef.current && dimensions.width > 0 && dimensions.height > 0) {
      const svg = d3.select(svgRef.current);

      const projection = d3
        .geoMercator()
        .fitSize([dimensions.width, dimensions.height], countryData)
        .center([43.3, 42])
        .scale(dimensions.width * (isMobileView ? 7.5 : 8));

      const path = d3.geoPath().projection(projection);

      // Update regions
      const regions = svg.selectAll<SVGPathElement, any>(".region").data(regionsData.features);

      regions
        .enter()
        .append("path")
        .attr("class", "region")
        .merge(regions)
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "rgb(0, 0, 0, 0.3)")
        .attr("stroke-width", 0.5);

      regions.exit().remove();

      // Update country border
      const country = svg.selectAll<SVGPathElement, any>(".country").data(countryData.features);

      country
        .enter()
        .append("path")
        .attr("class", "country")
        .merge(country)
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "rgb(0, 0, 0, 0.5)")
        .attr("stroke-width", 1);

      country.exit().remove();

      const newProjectedCities = cities.map((city) => ({
        name: city.name,
        x: projection(city.coordinates)![0],
        y: projection(city.coordinates)![1],
      }));

      setProjectedCities(newProjectedCities);
    }
  }, [countryData, regionsData, dimensions, isMobileView]);

  useEffect(() => {
    drawMap();
  }, [drawMap, resizeKey]);

  const generateInitialPath = (cities: { x: number; y: number }[]) => {
    return `M${cities.map((city) => `${city.x},${city.y}`).join(" L")}`;
  };

  const generateRandomPath = () => {
    const shuffled = [...projectedCities].sort(() => Math.random() - 0.5);
    return `M${shuffled.map((city) => `${city.x},${city.y}`).join(" L")}`;
  };

  useEffect(() => {
    if (mapInView && projectedCities.length > 0) {
      const showCitiesTimeout = setTimeout(() => {
        setShowCities(true);
        setLinePathData(generateInitialPath(projectedCities));
        setAnimationKey((prevKey) => prevKey + 1);
        setIsInitialAnimation(true);

        // Set up the animation cycle
        const cycleAnimation = () => {
          setIsInitialAnimation(false); // Trigger exit animation

          setTimeout(() => {
            setLinePathData(generateRandomPath());
            setAnimationKey((prevKey) => prevKey + 1);

            animationTimer.current = setTimeout(cycleAnimation, 3000); // 2.5s draw + 0.5s exit
          }, 500); // Wait for exit animation to complete
        };

        // Start the cycle after the initial animation
        setTimeout(cycleAnimation, 3500); // Wait for initial draw to complete
      }, 1000);

      return () => {
        clearTimeout(showCitiesTimeout);
        if (animationTimer.current) {
          clearTimeout(animationTimer.current);
        }
      };
    }
  }, [mapInView, projectedCities, resizeKey]);

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
                key={animationKey}
                d={linePathData}
                fill='none'
                stroke='#6d309d'
                strokeWidth={1}
                strokeDasharray='5,5'
                variants={isInitialAnimation ? initialPathVariants : subsequentPathVariants}
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
                  x={city.x - (isMobileView ? 28 : 40)}
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
