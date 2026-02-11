import { StaticImageData } from "next/image";

import verstappenImg from "../public/keywordImages/verstappen.png";
import hadjarImg from "../public/keywordImages/hadjar.jpeg";
import hamiltonImg from "../public/keywordImages/hamilton.png";
import leclercImg from "../public/keywordImages/leclerc.jpg";
import russellImg from "../public/keywordImages/russell.jpg";
import antonelliImg from "../public/keywordImages/antonelli.webp";
import piastriImg from "../public/keywordImages/piastri.jpg";
import norrisImg from "../public/keywordImages/norris.jpg";
import alonsoImg from "../public/keywordImages/alonso.webp";
import strollImg from "../public/keywordImages/stroll.webp";
import gaslyImg from "../public/keywordImages/gasly.jpeg";
import colapintoImg from "../public/keywordImages/colapinto.jpeg";
import oconImg from "../public/keywordImages/ocon.jpg";
import bearmanImg from "../public/keywordImages/bearman.jpeg";
import albonImg from "../public/keywordImages/albon.webp";
import sainzImg from "../public/keywordImages/sainz.jpg";
import lindbladImg from "../public/keywordImages/lindblad.jpg";
import lawsonImg from "../public/keywordImages/lawson.jpeg";
import bottasImg from "../public/keywordImages/bottas.jpg";
import perezImg from "../public/keywordImages/perez.webp";
import hulkenbergImg from "../public/keywordImages/hulkenberg.jpg";
import bortoletoImg from "../public/keywordImages/bortoleto.jpg";

import redbullImg from "../public/keywordImages/redbull.png";
import mercedesImg from "../public/keywordImages/mercedes.webp";
import ferrariImg from "../public/keywordImages/ferrari.webp";
import mclarenImg from "../public/keywordImages/mclaren.jpg";
import astonmartinImg from "../public/keywordImages/astonmartin.png";
import alpineImg from "../public/keywordImages/alpine.webp";
import cadillacImg from "../public/keywordImages/cadillac.webp";
import audiImg from "../public/keywordImages/audi.png";
import williamsImg from "../public/keywordImages/williams.jpg";
import vcarbImg from "../public/keywordImages/vcarb.jpg";
import haasImg from "../public/keywordImages/haas.png";

import defaultF1 from "../public/keywordImages/f1.png";

const imageMap: Record<string, StaticImageData> = {
  max: verstappenImg,
  verstappen: verstappenImg,
  hamilton: hamiltonImg,
  lewis: hamiltonImg,
  leclerc: leclercImg,
  charles: leclercImg,
  russell: russellImg,
  george: russellImg,
  hadjar: hadjarImg,
  isack: hadjarImg,
  antonelli: antonelliImg,
  kimi: antonelliImg,
  piastri: piastriImg,
  oscar: piastriImg,
  norris: norrisImg,
  lando: norrisImg,
  alonso: alonsoImg,
  fernando: alonsoImg,
  stroll: strollImg,
  lance: strollImg,
  gasly: gaslyImg,
  pierre: gaslyImg,
  colapinto: colapintoImg,
  franco: colapintoImg,
  ocon: oconImg,
  esteban: oconImg,
  bearman: bearmanImg,
  ollie: bearmanImg,
  oliver: bearmanImg,
  albon: albonImg,
  alex: albonImg,
  sainz: sainzImg,
  carlos: sainzImg,
  lindblad: lindbladImg,
  arvid: lindbladImg,
  lawson: lawsonImg,
  liam: lawsonImg,
  bottas: bottasImg,
  valtteri: bottasImg,
  perez: perezImg,
  sergio: perezImg,
  hulkenberg: hulkenbergImg,
  nico: hulkenbergImg,
  bortoleto: bortoletoImg,
  gabriel: bortoletoImg,
  "red bull": redbullImg,
  mekies: redbullImg,
  laurent: redbullImg,
  ferrari: ferrariImg,
  fred: ferrariImg,
  vasseur: ferrariImg,
  mercedes: mercedesImg,
  toto: mercedesImg,
  wolff: mercedesImg,
  alpine: alpineImg,
  flavio: alpineImg,
  briatore: alpineImg,
  cadillac: cadillacImg,

  audi: audiImg,
  jonathan: audiImg,
  wheatley: audiImg,
  williams: williamsImg,
  vowles: williamsImg,
  james: williamsImg,
  vcarb: vcarbImg,
  bayer: vcarbImg,
  peter: vcarbImg,
  haas: haasImg,
  ayao: haasImg,
  komatsu: haasImg,
  mclaren: mclarenImg,
  zak: mclarenImg,
  brown: mclarenImg,
  andrea: mclarenImg,
  stella: mclarenImg,
  "aston martin": astonmartinImg,
  adrian: astonmartinImg,
  newey: astonmartinImg,
};

export function getKeywordImage(keyword: string | null) {
  if (!keyword) return defaultF1;
  const normalised = keyword.trim().toLowerCase();
  return imageMap[normalised] || defaultF1;
}
