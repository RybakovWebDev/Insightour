import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { LazyMotion, m, useInView, Variants, AnimatePresence } from "framer-motion";
import { FeatureCollection } from "geojson";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

import styles from "./MapGeorgia.module.css";

import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";
import Image from "next/image";
import { ICONS } from "@/constants";

interface City {
  name: string;
  coordinates: [number, number];
}

interface LabelConfig {
  x: number;
  y: string;
  width: number;
  height: number;
}

interface CityLabelConfigs {
  [key: string]: LabelConfig;
  default: LabelConfig;
}

const cities: City[] = [
  { name: "Tbilisi", coordinates: [44.7833, 41.7167] },
  { name: "Kutaisi", coordinates: [42.7, 42.2667] },
  { name: "Batumi", coordinates: [41.6333, 41.6333] },
  { name: "Zugdidi", coordinates: [41.8709, 42.5088] },
  { name: "Sighnaghi", coordinates: [45.9214, 41.6166] },
  { name: "Mtskheta", coordinates: [44.7206, 41.845] },
  { name: "Telavi", coordinates: [45.4711, 41.9198] },
  { name: "Gudauri", coordinates: [44.4825, 42.4788] },
];

const mapVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 3.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, delay: 0.5 },
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
  const [animationKey, setAnimationKey] = useState(0);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobileView = useScreenWidthDetect(600);
  const mapInView = useInView(wrapperRef, { once: true, amount: 0.5 });

  const cityLabelConfigs: CityLabelConfigs = useMemo(
    () => ({
      default: {
        x: isMobileView ? 28 : 40,
        y: `${isMobileView ? 25 : 15}px`,
        width: isMobileView ? 55 : 80,
        height: isMobileView ? 25 : 30,
      },
      Tbilisi: {
        x: isMobileView ? 28 : 40,
        y: `${isMobileView ? -25 : -35}px`,
        width: isMobileView ? 55 : 80,
        height: isMobileView ? 25 : 30,
      },
      Batumi: {
        x: isMobileView ? 28 : 40,
        y: `${isMobileView ? -25 : -35}px`,
        width: isMobileView ? 55 : 80,
        height: isMobileView ? 25 : 30,
      },
      Sighnaghi: {
        x: isMobileView ? 28 : 40,
        y: `${isMobileView ? -25 : -35}px`,
        width: isMobileView ? 70 : 95,
        height: isMobileView ? 25 : 30,
      },
      Zugdidi: {
        x: isMobileView ? 48 : 40,
        y: `${isMobileView ? 20 : 15}px`,
        width: isMobileView ? 55 : 80,
        height: isMobileView ? 25 : 30,
      },
      Mtskheta: {
        x: isMobileView ? 48 : 40,
        y: `${isMobileView ? 20 : 15}px`,
        width: isMobileView ? 65 : 80,
        height: isMobileView ? 25 : 30,
      },
      Telavi: {
        x: isMobileView ? 18 : 40,
        y: `${isMobileView ? 25 : 15}px`,
        width: isMobileView ? 55 : 80,
        height: isMobileView ? 25 : 30,
      },
    }),
    [isMobileView]
  );

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
    return `M${cities
      .slice(0, 4)
      .map((city) => `${city.x},${city.y}`)
      .join(" L")}`;
  };

  const generateRandomPath = () => {
    const shuffled = [...projectedCities].sort(() => Math.random() - 0.5);
    const selectedCities = shuffled.slice(0, 4);
    return `M${selectedCities.map((city) => `${city.x},${city.y}`).join(" L")}`;
  };

  useEffect(() => {
    if (mapInView && projectedCities.length > 0) {
      const showCitiesTimeout = setTimeout(() => {
        setShowCities(true);
        setLinePathData(generateInitialPath(projectedCities));
        setAnimationKey((prevKey) => prevKey + 1);

        // Set up the animation cycle
        const cycleAnimation = () => {
          setLinePathData(generateRandomPath());
          setAnimationKey((prevKey) => prevKey + 1);

          animationTimer.current = setTimeout(cycleAnimation, 4500); // 3.5s draw + 0.5s delay + 0.5s exit
        };

        // Start the cycle after the initial animation
        setTimeout(cycleAnimation, 4500); // Wait for initial draw to complete + delay + exit
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
      <m.section
        ref={wrapperRef}
        className={styles.wrapper}
        variants={mapVariants}
        initial='hidden'
        animate={mapInView ? "show" : "hidden"}
      >
        <m.div
          className={styles.blackSea}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* <p>Black Sea</p> */}
          <Image
            src={ICONS.Swimming.src}
            alt={ICONS.Swimming.alt}
            height={isMobileView ? 20 : 30}
            width={isMobileView ? 20 : 30}
          />
        </m.div>

        <m.svg
          ref={svgRef}
          width='100%'
          height='100%'
          viewBox={`0 0 ${dimensions.width} ${isMobileView ? dimensions.height : "410"}`}
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
                variants={pathVariants}
                initial='hidden'
                animate='show'
                exit='exit'
              />
            )}
          </AnimatePresence>
          {showCities &&
            projectedCities.map((city, index) => {
              const labelConfig = cityLabelConfigs[city.name] || cityLabelConfigs.default;
              return (
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
                    x={city.x - labelConfig.x}
                    y={`calc(${city.y}px - ${dimensions.height * 0.05}px - ${labelConfig.y})`}
                    width={labelConfig.width}
                    height={labelConfig.height}
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
              );
            })}
        </m.svg>
      </m.section>
    </LazyMotion>
  );
};

export default GeorgiaMap;
