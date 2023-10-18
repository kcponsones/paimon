import {
  AnemoVisionIcon,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
} from "./icons";

export const vision = {
  anemo: {
    color: "#067b54",
    logoSrc: <AnemoVisionIcon />,
  },
  cryo: {
    color: "#EEFCFF",
    logoSrc: <CryoVisionIcon />,
  },
  dendro: {
    color: "#387017",
    logoSrc: <DendroVisionIcon />,
  },
  electro: {
    color: "#3d1e8c",
    logoSrc: <ElectroVisionIcon />,
  },
  geo: {
    color: "#CA8C00",
    logoSrc: <GeoVisionIcon />,
  },
  hydro: {
    color: "#063e77",
    logoSrc: <HydroVisionIcon />,
  },
  pyro: {
    color: "#8d1917",
    logoSrc: <PyroVisionIcon />,
  },
};

export const convertVisionToColor = (vision) => {
  let colorVision = "";
  switch (vision) {
    case "anemo": {
      colorVision = "#067b54";
      break;
    }
    case "cryo": {
      colorVision = "#EEFCFF";
      break;
    }
    case "dendro": {
      colorVision = "#387017";
      break;
    }
    case "electro": {
      colorVision = "#3d1e8c";
      break;
    }
    case "geo": {
      colorVision = "#CA8C00";
      break;
    }
    case "hydro": {
      colorVision = "#063e77";
      break;
    }
    case "pyro": {
      colorVision = "#8d1917";
      break;
    }
  }
  return colorVision;
};
