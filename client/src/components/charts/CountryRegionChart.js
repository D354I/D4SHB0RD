import React, { useEffect, useState } from "react";
import { ReactComponent as WorldMap } from "../../assets/world-map.svg";

// normalize country names (match SVG IDs)
const normalizeCountryName = (name) => {
  const countryMappings = {
    Belize: "bz",
    "United Kingdom": "gb",
    Ghana: "gh",
    Ukraine: "ua",
    Libya: "ly",
    Liberia: "lr",
    "United States of America": "us",
    Canada: "ca",
    Mexico: "mx",
    Poland: "pl",
    Lebanon: "lb",
    Russia: "ru",
    Colombia: "co",
    Mali: "ml",
    Denmark: "dk",
    Indonesia: "id",
    Iran: "ir",
    Norway: "no",
    Jordan: "jo",
    Cyprus: "cy",
    Spain: "es",
    "Saudi Arabia": "sa",
    Pakistan: "pk",
    Niger: "ne",
    "South Sudan": "ss",
    Venezuela: "ve",
    "United Arab Emirates": "ae",
    India: "in",
    Syria: "sy",
    Australia: "au",
    Kuwait: "kw",
    "Burkina Faso": "bf",
    Morocco: "ma",
    Hungary: "hu",
    Austria: "at",
    Qatar: "qa",
    Iraq: "iq",
    "South Africa": "za",
    Gabon: "ga",
    Greece: "gr",
    Angola: "ao",
    Estonia: "ee",
    Oman: "om",
    Azerbaijan: "az",
    Turkey: "tr",
    Egypt: "eg",
    Japan: "jp",
    Nigeria: "ng",
    Brazil: "br",
    Kazakhstan: "kz",
    China: "cn",
    Argentina: "ar",
    Ethiopia: "et",
    Malaysia: "my",
    Algeria: "dz",
    Germany: "de",
  };
  return countryMappings[name] || name;
};

const countryColors = {
  bz: "#FF4500",
  gb: "#32CD32",
  gh: "#1E90FF",
  ua: "#FFD700",
  ly: "#FF69B4",
  lr: "#00CED1",
  us: "#FF1493",
  ca: "#FFD700",
  mx: "#20B2AA",
  pl: "#FF4500",
  lb: "#8A2BE2",
  ru: "#FF0000",
  co: "#00FF00",
  ml: "#FFA500",
  dk: "#ADFF2F",
  id: "#FF8C00",
  ir: "#DA70D6",
  no: "#4682B4",
  jo: "#FF69B4",
  cy: "#FFB6C1",
  es: "#00BFFF",
  sa: "#FFFF00",
  pk: "#00FA9A",
  ne: "#FFA500",
  ss: "#B0E0E6",
  ve: "#FFB6C1",
  ae: "#90EE90",
  in: "#FF8C00",
  sy: "#98FB98",
  au: "#FFD700",
  kw: "#FF6347",
  bf: "#3CB371",
  ma: "#8B0000",
  hu: "#00BFFF",
  at: "#BA55D3",
  qa: "#FF4500",
  iq: "#FF69B4",
  za: "#FF4500",
  ga: "#3CB371",
  gr: "#FFD700",
  ao: "#20B2AA",
  ee: "#4682B4",
  om: "#FF4500",
  az: "#FF69B4",
  tr: "#7FFF00",
  eg: "#20B2AA",
  jp: "#FF1493",
  ng: "#00FF00",
  br: "#FF4500",
  kz: "#00CED1",
  cn: "#FF6347",
  ar: "#FF4500",
  et: "#1E90FF",
  my: "#32CD32",
  dz: "#FFB6C1",
  de: "#FF0000",
};

const CountryRegionChart = ({ data }) => {
  const [highlightedCountries, setHighlightedCountries] = useState([]);

  useEffect(() => {
    if (data) {
      const normalizedCountries = data.map((country) =>
        normalizeCountryName(country._id)
      );
      setHighlightedCountries(normalizedCountries);
    }
  }, [data]);

  return (
    <div className="my-4">
      <h3>Insights by Country</h3>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "400px", position: "relative" }}
      >
        <WorldMap
          className="svg-map"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        {highlightedCountries.map((countryId) => (
          <style key={countryId}>
            {`
                        .svg-map #${countryId} {
                            fill: ${
                              countryColors[countryId] || "#D3D3D3"
                            }; /* Default to light gray */
                        }
                    `}
          </style>
        ))}
      </div>
    </div>
  );
};

export default CountryRegionChart;
