import { BIKES } from "./catalog";

export type CompareModel = {
  id: string;
  name: string;
  brand: string;
  type: string;
  engine: string;
  power: string;
  mileage: string;
  weight: string;
  price: string;
  fuel: "Petrol" | "Electric";
};

/** Every TVS model available at Zaidi TVS. */
export const TVS_COMPARE: CompareModel[] = BIKES.map((bike) => ({
  id: `tvs-${bike.slug}`,
  name: bike.name,
  brand: "TVS",
  type: bike.kind,
  engine: bike.engine,
  power: bike.power,
  mileage: bike.mileage,
  weight: bike.weight,
  price: bike.price?.trim() || "Contact showroom",
  fuel: bike.kind === "Electric" ? "Electric" : "Petrol",
}));

type OtherInput = [
  id: string,
  name: string,
  brand: string,
  type: string,
  engine: string,
  power: string,
  mileage: string,
  weight: string,
  fuel?: "Petrol" | "Electric",
];

function other([id, name, brand, type, engine, power, mileage, weight, fuel]: OtherInput): CompareModel {
  return {
    id,
    name,
    brand,
    type,
    engine,
    power,
    mileage,
    weight,
    price: "Contact showroom",
    fuel: fuel ?? "Petrol",
  };
}

/**
 * Popular two-wheelers from other brands available in India, for honest
 * cross-brand comparisons. Figures are indicative and marked on the page.
 * EVs use "range" in the mileage field.
 */
export const OTHER_COMPARE: CompareModel[] = (
  [
    // Honda
    ["honda-activa-6g", "Honda Activa 6G", "Honda", "Scooter", "109.51 cc", "7.68 PS", "Up to 50 km/l*", "106 kg*"],
    ["honda-activa-125", "Honda Activa 125", "Honda", "Scooter", "123.92 cc", "8.29 PS", "Up to 47 km/l*", "111 kg*"],
    ["honda-dio-125", "Honda Dio 125", "Honda", "Scooter", "123.92 cc", "8.29 PS", "Up to 46 km/l*", "105 kg*"],
    ["honda-shine-100", "Honda Shine 100", "Honda", "Motorcycle", "98.98 cc", "7.38 PS", "Up to 65 km/l*", "99 kg*"],
    ["honda-shine-125", "Honda Shine 125", "Honda", "Motorcycle", "123.94 cc", "10.59 PS", "Up to 55 km/l*", "114 kg*"],
    ["honda-sp-125", "Honda SP 125", "Honda", "Motorcycle", "123.94 cc", "10.72 PS", "Up to 65 km/l*", "116 kg*"],
    ["honda-unicorn", "Honda Unicorn", "Honda", "Motorcycle", "162.71 cc", "12.91 PS", "Up to 50 km/l*", "140 kg*"],
    ["honda-hornet-2", "Honda Hornet 2.0", "Honda", "Motorcycle", "184.40 cc", "17.26 PS", "Up to 45 km/l*", "142 kg*"],
    ["honda-cb350", "Honda CB350", "Honda", "Motorcycle", "348.36 cc", "20.78 PS", "Up to 35 km/l*", "181 kg*"],
    ["honda-cb350rs", "Honda CB350RS", "Honda", "Motorcycle", "348.36 cc", "20.78 PS", "Up to 35 km/l*", "179 kg*"],
    ["honda-nx200", "Honda NX200", "Honda", "Motorcycle", "184.40 cc", "17.26 PS", "Up to 40 km/l*", "147 kg*"],
    ["honda-cb300f", "Honda CB300F", "Honda", "Motorcycle", "293.52 cc", "24.47 PS", "Up to 33 km/l*", "153 kg*"],
    ["honda-livo", "Honda Livo", "Honda", "Motorcycle", "109.51 cc", "8.79 PS", "Up to 70 km/l*", "115 kg*"],
    ["honda-cd110-dream", "Honda CD 110 Dream", "Honda", "Motorcycle", "109.51 cc", "8.79 PS", "Up to 70 km/l*", "112 kg*"],
    ["honda-grazia-125", "Honda Grazia 125", "Honda", "Scooter", "123.92 cc", "8.29 PS", "Up to 45 km/l*", "107 kg*"],
    ["honda-aviator", "Honda Aviator", "Honda", "Scooter", "109.51 cc", "8.09 PS", "Up to 50 km/l*", "106 kg*"],
    ["honda-navi", "Honda Navi", "Honda", "Scooter", "109.51 cc", "8.09 PS", "Up to 45 km/l*", "101 kg*"],
    ["honda-activa-e", "Honda Activa e", "Honda", "Electric", "Electric motor", "6.0 kW", "Up to 102 km range*", "119 kg*", "Electric"],
    ["honda-qc1", "Honda QC1", "Honda", "Electric", "Electric motor", "1.8 kW", "Up to 80 km range*", "70 kg*", "Electric"],

    // Hero
    ["hero-splendor-plus", "Hero Splendor Plus", "Hero", "Motorcycle", "97.2 cc", "8.02 PS", "Up to 70 km/l*", "112 kg*"],
    ["hero-splendor-plus-xtec", "Hero Splendor Plus XTEC", "Hero", "Motorcycle", "97.2 cc", "8.02 PS", "Up to 70 km/l*", "112 kg*"],
    ["hero-hf-deluxe", "Hero HF Deluxe", "Hero", "Motorcycle", "97.2 cc", "8.02 PS", "Up to 70 km/l*", "110 kg*"],
    ["hero-passion-plus", "Hero Passion Plus", "Hero", "Motorcycle", "97.2 cc", "8.02 PS", "Up to 65 km/l*", "115 kg*"],
    ["hero-glamour", "Hero Glamour", "Hero", "Motorcycle", "124.7 cc", "10.87 PS", "Up to 60 km/l*", "123 kg*"],
    ["hero-glamour-x", "Hero Glamour X", "Hero", "Motorcycle", "124.7 cc", "10.87 PS", "Up to 60 km/l*", "124 kg*"],
    ["hero-xtreme-125r", "Hero Xtreme 125R", "Hero", "Motorcycle", "124.7 cc", "11.4 PS", "Up to 66 km/l*", "136 kg*"],
    ["hero-xtreme-160r-4v", "Hero Xtreme 160R 4V", "Hero", "Motorcycle", "163.2 cc", "16.9 PS", "Up to 50 km/l*", "144 kg*"],
    ["hero-xtreme-200s-4v", "Hero Xtreme 200S 4V", "Hero", "Motorcycle", "199.6 cc", "19.1 PS", "Up to 40 km/l*", "154 kg*"],
    ["hero-xpulse-200-4v", "Hero Xpulse 200 4V", "Hero", "Motorcycle", "199.6 cc", "19.1 PS", "Up to 35 km/l*", "158 kg*"],
    ["hero-xpulse-210", "Hero Xpulse 210", "Hero", "Motorcycle", "210 cc", "24.6 PS", "Up to 35 km/l*", "165 kg*"],
    ["hero-xtreme-250r", "Hero Xtreme 250R", "Hero", "Motorcycle", "249.7 cc", "29.5 PS", "Up to 30 km/l*", "167 kg*"],
    ["hero-karizma-xmr", "Hero Karizma XMR", "Hero", "Motorcycle", "210 cc", "25.5 PS", "Up to 35 km/l*", "163 kg*"],
    ["hero-mavrick-440", "Hero Mavrick 440", "Hero", "Motorcycle", "440 cc", "27 PS", "Up to 30 km/l*", "187 kg*"],
    ["hero-destini-125", "Hero Destini 125", "Hero", "Scooter", "124.6 cc", "9 PS", "Up to 50 km/l*", "115 kg*"],
    ["hero-pleasure-plus", "Hero Pleasure Plus", "Hero", "Scooter", "110.9 cc", "8.15 PS", "Up to 55 km/l*", "106 kg*"],
    ["hero-maestro-edge-125", "Hero Maestro Edge 125", "Hero", "Scooter", "124.6 cc", "9 PS", "Up to 50 km/l*", "115 kg*"],
    ["hero-xoom-110", "Hero Xoom 110", "Hero", "Scooter", "110.9 cc", "8.15 PS", "Up to 50 km/l*", "103 kg*"],
    ["hero-xoom-125", "Hero Xoom 125", "Hero", "Scooter", "124.6 cc", "9 PS", "Up to 48 km/l*", "108 kg*"],
    ["hero-xoom-160", "Hero Xoom 160", "Hero", "Scooter", "156 cc", "13.6 PS", "Up to 45 km/l*", "130 kg*"],
    ["hero-vida-v1-pro", "Hero Vida V1 Pro", "Hero", "Electric", "Electric motor", "6.0 kW", "Up to 110 km range*", "124 kg*", "Electric"],
    ["hero-vida-v2", "Hero Vida V2", "Hero", "Electric", "Electric motor", "6.0 kW", "Up to 165 km range*", "125 kg*", "Electric"],

    // Bajaj
    ["bajaj-platina-100", "Bajaj Platina 100", "Bajaj", "Motorcycle", "102 cc", "7.9 PS", "Up to 70 km/l*", "118 kg*"],
    ["bajaj-platina-110", "Bajaj Platina 110", "Bajaj", "Motorcycle", "115.45 cc", "8.6 PS", "Up to 70 km/l*", "119 kg*"],
    ["bajaj-ct100", "Bajaj CT 100", "Bajaj", "Motorcycle", "102 cc", "7.9 PS", "Up to 70 km/l*", "115 kg*"],
    ["bajaj-ct125x", "Bajaj CT 125X", "Bajaj", "Motorcycle", "124.4 cc", "10.9 PS", "Up to 60 km/l*", "127 kg*"],
    ["bajaj-pulsar-125", "Bajaj Pulsar 125", "Bajaj", "Motorcycle", "124.4 cc", "11.64 PS", "Up to 55 km/l*", "142 kg*"],
    ["bajaj-pulsar-150", "Bajaj Pulsar 150", "Bajaj", "Motorcycle", "149.5 cc", "13.8 PS", "Up to 50 km/l*", "148 kg*"],
    ["bajaj-pulsar-n150", "Bajaj Pulsar N150", "Bajaj", "Motorcycle", "149.68 cc", "14.5 PS", "Up to 50 km/l*", "144 kg*"],
    ["bajaj-pulsar-n160", "Bajaj Pulsar N160", "Bajaj", "Motorcycle", "164.82 cc", "16.0 PS", "Up to 45 km/l*", "152 kg*"],
    ["bajaj-pulsar-n250", "Bajaj Pulsar N250", "Bajaj", "Motorcycle", "249.07 cc", "24.5 PS", "Up to 38 km/l*", "164 kg*"],
    ["bajaj-pulsar-ns200", "Bajaj Pulsar NS200", "Bajaj", "Motorcycle", "199.5 cc", "24.13 PS", "Up to 38 km/l*", "159 kg*"],
    ["bajaj-pulsar-ns400z", "Bajaj Pulsar NS400Z", "Bajaj", "Motorcycle", "373.3 cc", "40 PS", "Up to 30 km/l*", "174 kg*"],
    ["bajaj-pulsar-rs200", "Bajaj Pulsar RS200", "Bajaj", "Motorcycle", "199.5 cc", "24.13 PS", "Up to 35 km/l*", "166 kg*"],
    ["bajaj-pulsar-220f", "Bajaj Pulsar 220F", "Bajaj", "Motorcycle", "220 cc", "20.11 PS", "Up to 40 km/l*", "160 kg*"],
    ["bajaj-freedom-125", "Bajaj Freedom 125 CNG", "Bajaj", "Motorcycle", "125 cc", "9.5 PS", "Up to 65 km/kg*", "149 kg*"],
    ["bajaj-avenger-cruise-220", "Bajaj Avenger Cruise 220", "Bajaj", "Motorcycle", "220 cc", "19.03 PS", "Up to 40 km/l*", "163 kg*"],
    ["bajaj-avenger-street-160", "Bajaj Avenger Street 160", "Bajaj", "Motorcycle", "160 cc", "15 PS", "Up to 45 km/l*", "156 kg*"],
    ["bajaj-dominar-250", "Bajaj Dominar 250", "Bajaj", "Motorcycle", "248.8 cc", "27 PS", "Up to 35 km/l*", "180 kg*"],
    ["bajaj-dominar-400", "Bajaj Dominar 400", "Bajaj", "Motorcycle", "373.3 cc", "40 PS", "Up to 30 km/l*", "193 kg*"],
    ["bajaj-chetak", "Bajaj Chetak", "Bajaj", "Electric", "Electric motor", "4.08 kW", "Up to 127 km range*", "133 kg*", "Electric"],

    // Yamaha
    ["yamaha-fascino-125", "Yamaha Fascino 125", "Yamaha", "Scooter", "125 cc", "8.2 PS", "Up to 52 km/l*", "99 kg*"],
    ["yamaha-rayzr-125", "Yamaha RayZR 125", "Yamaha", "Scooter", "125 cc", "8.2 PS", "Up to 52 km/l*", "99 kg*"],
    ["yamaha-fz-s", "Yamaha FZ-S Fi", "Yamaha", "Motorcycle", "149 cc", "12.4 PS", "Up to 50 km/l*", "136 kg*"],
    ["yamaha-fz-x", "Yamaha FZ-X", "Yamaha", "Motorcycle", "149 cc", "12.4 PS", "Up to 48 km/l*", "139 kg*"],
    ["yamaha-mt-15", "Yamaha MT-15", "Yamaha", "Motorcycle", "155 cc", "18.1 PS", "Up to 45 km/l*", "141 kg*"],
    ["yamaha-r15", "Yamaha R15", "Yamaha", "Motorcycle", "155 cc", "18.4 PS", "Up to 45 km/l*", "142 kg*"],
    ["yamaha-r15m", "Yamaha R15M", "Yamaha", "Motorcycle", "155 cc", "18.4 PS", "Up to 45 km/l*", "142 kg*"],
    ["yamaha-r3", "Yamaha R3", "Yamaha", "Motorcycle", "321 cc", "42 PS", "Up to 30 km/l*", "169 kg*"],
    ["yamaha-mt-03", "Yamaha MT-03", "Yamaha", "Motorcycle", "321 cc", "42 PS", "Up to 30 km/l*", "169 kg*"],
    ["yamaha-aerox-155", "Yamaha Aerox 155", "Yamaha", "Scooter", "155 cc", "15 PS", "Up to 45 km/l*", "126 kg*"],

    // Suzuki
    ["suzuki-access-125", "Suzuki Access 125", "Suzuki", "Scooter", "124 cc", "8.7 PS", "Up to 52 km/l*", "104 kg*"],
    ["suzuki-burgman-street-125", "Suzuki Burgman Street 125", "Suzuki", "Scooter", "124 cc", "8.7 PS", "Up to 48 km/l*", "110 kg*"],
    ["suzuki-burgman-street-ex", "Suzuki Burgman Street EX", "Suzuki", "Scooter", "124 cc", "8.7 PS", "Up to 48 km/l*", "112 kg*"],
    ["suzuki-avenis-125", "Suzuki Avenis 125", "Suzuki", "Scooter", "124 cc", "8.7 PS", "Up to 50 km/l*", "106 kg*"],
    ["suzuki-swish-125", "Suzuki Swish 125", "Suzuki", "Scooter", "124 cc", "8.7 PS", "Up to 50 km/l*", "104 kg*"],
    ["suzuki-gixxer-150", "Suzuki Gixxer 150", "Suzuki", "Motorcycle", "155 cc", "14.1 PS", "Up to 45 km/l*", "141 kg*"],
    ["suzuki-gixxer-sf-150", "Suzuki Gixxer SF 150", "Suzuki", "Motorcycle", "155 cc", "14.1 PS", "Up to 45 km/l*", "146 kg*"],
    ["suzuki-gixxer-250", "Suzuki Gixxer 250", "Suzuki", "Motorcycle", "249 cc", "26.5 PS", "Up to 35 km/l*", "156 kg*"],
    ["suzuki-gixxer-sf-250", "Suzuki Gixxer SF 250", "Suzuki", "Motorcycle", "249 cc", "26.5 PS", "Up to 35 km/l*", "161 kg*"],
    ["suzuki-v-strom-sx-250", "Suzuki V-Strom SX 250", "Suzuki", "Motorcycle", "249 cc", "26.5 PS", "Up to 35 km/l*", "167 kg*"],
    ["suzuki-intruder-150", "Suzuki Intruder 150", "Suzuki", "Motorcycle", "155 cc", "14.1 PS", "Up to 45 km/l*", "152 kg*"],

    // Royal Enfield
    ["royal-enfield-hunter-350", "Royal Enfield Hunter 350", "Royal Enfield", "Motorcycle", "349.34 cc", "20.2 PS", "Up to 36 km/l*", "181 kg*"],
    ["royal-enfield-classic-350", "Royal Enfield Classic 350", "Royal Enfield", "Motorcycle", "349.34 cc", "20.2 PS", "Up to 37 km/l*", "195 kg*"],
    ["royal-enfield-bullet-350", "Royal Enfield Bullet 350", "Royal Enfield", "Motorcycle", "349.34 cc", "20.2 PS", "Up to 37 km/l*", "195 kg*"],
    ["royal-enfield-meteor-350", "Royal Enfield Meteor 350", "Royal Enfield", "Motorcycle", "349.34 cc", "20.2 PS", "Up to 36 km/l*", "191 kg*"],
    ["royal-enfield-himalayan-450", "Royal Enfield Himalayan 450", "Royal Enfield", "Motorcycle", "452 cc", "40.02 PS", "Up to 30 km/l*", "196 kg*"],
    ["royal-enfield-scram-440", "Royal Enfield Scram 440", "Royal Enfield", "Motorcycle", "443 cc", "25.4 PS", "Up to 32 km/l*", "187 kg*"],
    ["royal-enfield-guerrilla-450", "Royal Enfield Guerrilla 450", "Royal Enfield", "Motorcycle", "452 cc", "40.02 PS", "Up to 31 km/l*", "185 kg*"],
    ["royal-enfield-continental-gt-650", "Royal Enfield Continental GT 650", "Royal Enfield", "Motorcycle", "648 cc", "47 PS", "Up to 27 km/l*", "198 kg*"],
    ["royal-enfield-interceptor-650", "Royal Enfield Interceptor 650", "Royal Enfield", "Motorcycle", "648 cc", "47 PS", "Up to 27 km/l*", "202 kg*"],
    ["royal-enfield-super-meteor-650", "Royal Enfield Super Meteor 650", "Royal Enfield", "Motorcycle", "648 cc", "47 PS", "Up to 25 km/l*", "241 kg*"],
    ["royal-enfield-shotgun-650", "Royal Enfield Shotgun 650", "Royal Enfield", "Motorcycle", "648 cc", "47 PS", "Up to 25 km/l*", "240 kg*"],
    ["royal-enfield-bear-650", "Royal Enfield Bear 650", "Royal Enfield", "Motorcycle", "648 cc", "47 PS", "Up to 26 km/l*", "216 kg*"],
    ["royal-enfield-classic-650", "Royal Enfield Classic 650", "Royal Enfield", "Motorcycle", "648 cc", "47 PS", "Up to 25 km/l*", "243 kg*"],
    ["royal-enfield-goan-classic-350", "Royal Enfield Goan Classic 350", "Royal Enfield", "Motorcycle", "349.34 cc", "20.2 PS", "Up to 36 km/l*", "197 kg*"],

    // KTM + Husqvarna
    ["ktm-duke-125", "KTM Duke 125", "KTM", "Motorcycle", "124.7 cc", "14.5 PS", "Up to 45 km/l*", "162 kg*"],
    ["ktm-duke-200", "KTM Duke 200", "KTM", "Motorcycle", "199.5 cc", "25 PS", "Up to 35 km/l*", "159 kg*"],
    ["ktm-duke-250", "KTM Duke 250", "KTM", "Motorcycle", "249.7 cc", "30.6 PS", "Up to 33 km/l*", "162 kg*"],
    ["ktm-duke-390", "KTM Duke 390", "KTM", "Motorcycle", "398.6 cc", "46.3 PS", "Up to 28 km/l*", "165 kg*"],
    ["ktm-rc-200", "KTM RC 200", "KTM", "Motorcycle", "199.5 cc", "25 PS", "Up to 35 km/l*", "160 kg*"],
    ["ktm-rc-390", "KTM RC 390", "KTM", "Motorcycle", "373.2 cc", "43.5 PS", "Up to 28 km/l*", "172 kg*"],
    ["ktm-adventure-250", "KTM Adventure 250", "KTM", "Motorcycle", "248.8 cc", "30.5 PS", "Up to 32 km/l*", "177 kg*"],
    ["ktm-adventure-390", "KTM Adventure 390", "KTM", "Motorcycle", "373.2 cc", "43.5 PS", "Up to 28 km/l*", "194 kg*"],
    ["husqvarna-svartpilen-250", "Husqvarna Svartpilen 250", "Husqvarna", "Motorcycle", "248.8 cc", "30.5 PS", "Up to 32 km/l*", "166 kg*"],
    ["husqvarna-vitpilen-250", "Husqvarna Vitpilen 250", "Husqvarna", "Motorcycle", "248.8 cc", "30.5 PS", "Up to 32 km/l*", "166 kg*"],
    ["husqvarna-svartpilen-401", "Husqvarna Svartpilen 401", "Husqvarna", "Motorcycle", "398.6 cc", "46 PS", "Up to 28 km/l*", "171 kg*"],
    ["husqvarna-vitpilen-401", "Husqvarna Vitpilen 401", "Husqvarna", "Motorcycle", "398.6 cc", "46 PS", "Up to 28 km/l*", "171 kg*"],

    // Electric scooters
    ["ola-s1-x", "Ola S1 X", "Ola Electric", "Electric", "Electric motor", "4.5 kW", "Up to 151 km range*", "108 kg*", "Electric"],
    ["ola-s1-x-plus", "Ola S1 X+", "Ola Electric", "Electric", "Electric motor", "4.5 kW", "Up to 151 km range*", "108 kg*", "Electric"],
    ["ola-s1-pro", "Ola S1 Pro", "Ola Electric", "Electric", "Electric motor", "11 kW", "Up to 195 km range*", "116 kg*", "Electric"],
    ["ola-s1-pro-plus", "Ola S1 Pro+", "Ola Electric", "Electric", "Electric motor", "11 kW", "Up to 195 km range*", "116 kg*", "Electric"],
    ["ola-roadster-x", "Ola Roadster X", "Ola Electric", "Electric", "Electric motor", "4.5 kW", "Up to 200 km range*", "119 kg*", "Electric"],
    ["ola-roadster", "Ola Roadster", "Ola Electric", "Electric", "Electric motor", "11 kW", "Up to 248 km range*", "130 kg*", "Electric"],
    ["ola-roadster-pro", "Ola Roadster Pro", "Ola Electric", "Electric", "Electric motor", "16 kW", "Up to 320 km range*", "141 kg*", "Electric"],
    ["ather-450s", "Ather 450S", "Ather", "Electric", "Electric motor", "5.4 kW", "Up to 115 km range*", "111 kg*", "Electric"],
    ["ather-450x", "Ather 450X", "Ather", "Electric", "Electric motor", "6.4 kW", "Up to 150 km range*", "111 kg*", "Electric"],
    ["ather-450-apex", "Ather 450 Apex", "Ather", "Electric", "Electric motor", "6.4 kW", "Up to 157 km range*", "111 kg*", "Electric"],
    ["ather-rizta-s", "Ather Rizta S", "Ather", "Electric", "Electric motor", "4.3 kW", "Up to 123 km range*", "119 kg*", "Electric"],
    ["ather-rizta-z", "Ather Rizta Z", "Ather", "Electric", "Electric motor", "4.3 kW", "Up to 160 km range*", "119 kg*", "Electric"],
    ["ampere-magnus", "Ampere Magnus", "Ampere", "Electric", "Electric motor", "1.2 kW", "Up to 80 km range*", "95 kg*", "Electric"],
    ["ampere-nexus", "Ampere Nexus", "Ampere", "Electric", "Electric motor", "4.0 kW", "Up to 136 km range*", "118 kg*", "Electric"],
    ["ampere-reo", "Ampere Reo", "Ampere", "Electric", "Electric motor", "1.2 kW", "Up to 70 km range*", "86 kg*", "Electric"],
    ["ampere-zeal", "Ampere Zeal", "Ampere", "Electric", "Electric motor", "1.2 kW", "Up to 75 km range*", "90 kg*", "Electric"],
    ["pure-ev-etrance-neo", "Pure EV ETrance Neo", "Pure EV", "Electric", "Electric motor", "1.5 kW", "Up to 110 km range*", "85 kg*", "Electric"],
    ["pure-ev-epluto-7g", "Pure EV EPluto 7G", "Pure EV", "Electric", "Electric motor", "1.5 kW", "Up to 120 km range*", "92 kg*", "Electric"],
    ["revolt-rv400", "Revolt RV400", "Revolt", "Electric", "Electric motor", "3.0 kW", "Up to 150 km range*", "108 kg*", "Electric"],
    ["revolt-rv400-brz", "Revolt RV400 BRZ", "Revolt", "Electric", "Electric motor", "3.0 kW", "Up to 150 km range*", "108 kg*", "Electric"],
    ["ultraviolette-f77", "Ultraviolette F77", "Ultraviolette", "Electric", "Electric motor", "27 kW", "Up to 307 km range*", "207 kg*", "Electric"],
    ["ultraviolette-f77-mach2", "Ultraviolette F77 Mach 2", "Ultraviolette", "Electric", "Electric motor", "30 kW", "Up to 323 km range*", "207 kg*", "Electric"],
    ["bounce-infinity-e1", "Bounce Infinity E1", "Bounce", "Electric", "Electric motor", "1.5 kW", "Up to 85 km range*", "94 kg*", "Electric"],
    ["simple-one", "Simple One", "Simple Energy", "Electric", "Electric motor", "8.5 kW", "Up to 212 km range*", "134 kg*", "Electric"],
    ["river-indie", "River Indie", "River", "Electric", "Electric motor", "6.7 kW", "Up to 120 km range*", "127 kg*", "Electric"],
    ["tork-kratos-r", "Tork Kratos R", "Tork Motors", "Electric", "Electric motor", "9 kW", "Up to 180 km range*", "150 kg*", "Electric"],
    ["kinetic-e-luna", "Kinetic E-Luna", "Kinetic Green", "Electric", "Electric motor", "1.5 kW", "Up to 110 km range*", "88 kg*", "Electric"],
    ["kinetic-green-zoom", "Kinetic Green Zoom", "Kinetic Green", "Electric", "Electric motor", "1.2 kW", "Up to 80 km range*", "92 kg*", "Electric"],

    // Jawa / Yezdi
    ["jawa-42", "Jawa 42", "Jawa", "Motorcycle", "294.72 cc", "27.33 PS", "Up to 33 km/l*", "184 kg*"],
    ["jawa-42-fj", "Jawa 42 FJ", "Jawa", "Motorcycle", "334 cc", "29.5 PS", "Up to 32 km/l*", "184 kg*"],
    ["jawa-350", "Jawa 350", "Jawa", "Motorcycle", "334 cc", "22.5 PS", "Up to 33 km/l*", "194 kg*"],
    ["jawa-perak", "Jawa Perak", "Jawa", "Motorcycle", "334 cc", "30.64 PS", "Up to 30 km/l*", "184 kg*"],
    ["yezdi-roadster", "Yezdi Roadster", "Yezdi", "Motorcycle", "334 cc", "29.5 PS", "Up to 32 km/l*", "184 kg*"],
    ["yezdi-scrambler", "Yezdi Scrambler", "Yezdi", "Motorcycle", "334 cc", "29.5 PS", "Up to 30 km/l*", "182 kg*"],
    ["yezdi-adventure", "Yezdi Adventure", "Yezdi", "Motorcycle", "334 cc", "30.2 PS", "Up to 30 km/l*", "188 kg*"],

    // Vespa / Aprilia
    ["vespa-lx-125", "Vespa LX 125", "Vespa", "Scooter", "124.45 cc", "9.2 PS", "Up to 45 km/l*", "114 kg*"],
    ["vespa-vxl-125", "Vespa VXL 125", "Vespa", "Scooter", "124.45 cc", "9.2 PS", "Up to 45 km/l*", "114 kg*"],
    ["vespa-sxl-125", "Vespa SXL 125", "Vespa", "Scooter", "124.45 cc", "9.2 PS", "Up to 45 km/l*", "114 kg*"],
    ["vespa-elettrica", "Vespa Elettrica", "Vespa", "Electric", "Electric motor", "4.0 kW", "Up to 100 km range*", "130 kg*", "Electric"],
    ["aprilia-sr-125", "Aprilia SR 125", "Aprilia", "Scooter", "124.45 cc", "9.2 PS", "Up to 45 km/l*", "118 kg*"],
    ["aprilia-sr-160", "Aprilia SR 160", "Aprilia", "Scooter", "160.03 cc", "11 PS", "Up to 40 km/l*", "122 kg*"],
    ["aprilia-rs-457", "Aprilia RS 457", "Aprilia", "Motorcycle", "457 cc", "47.6 PS", "Up to 25 km/l*", "175 kg*"],
    ["aprilia-tuono-457", "Aprilia Tuono 457", "Aprilia", "Motorcycle", "457 cc", "47.6 PS", "Up to 25 km/l*", "175 kg*"],

    // Kawasaki
    ["kawasaki-ninja-300", "Kawasaki Ninja 300", "Kawasaki", "Motorcycle", "296 cc", "39 PS", "Up to 28 km/l*", "179 kg*"],
    ["kawasaki-ninja-400", "Kawasaki Ninja 400", "Kawasaki", "Motorcycle", "399 cc", "45 PS", "Up to 28 km/l*", "168 kg*"],
    ["kawasaki-ninja-500", "Kawasaki Ninja 500", "Kawasaki", "Motorcycle", "451 cc", "45.4 PS", "Up to 30 km/l*", "171 kg*"],
    ["kawasaki-z500", "Kawasaki Z500", "Kawasaki", "Motorcycle", "451 cc", "45.4 PS", "Up to 30 km/l*", "167 kg*"],
    ["kawasaki-eliminator-400", "Kawasaki Eliminator 400", "Kawasaki", "Motorcycle", "398 cc", "45 PS", "Up to 30 km/l*", "176 kg*"],
    ["kawasaki-versys-650", "Kawasaki Versys 650", "Kawasaki", "Motorcycle", "649 cc", "66 PS", "Up to 22 km/l*", "219 kg*"],
    ["kawasaki-w175", "Kawasaki W175", "Kawasaki", "Motorcycle", "177 cc", "13 PS", "Up to 40 km/l*", "135 kg*"],

    // Benelli / Keeway / CFMoto / Harley / Triumph / BMW
    ["benelli-imperiale-400", "Benelli Imperiale 400", "Benelli", "Motorcycle", "374 cc", "21 PS", "Up to 35 km/l*", "205 kg*"],
    ["benelli-trk-251", "Benelli TRK 251", "Benelli", "Motorcycle", "249 cc", "25.8 PS", "Up to 30 km/l*", "188 kg*"],
    ["benelli-trk-502", "Benelli TRK 502", "Benelli", "Motorcycle", "500 cc", "47.5 PS", "Up to 25 km/l*", "235 kg*"],
    ["benelli-leoncino-500", "Benelli Leoncino 500", "Benelli", "Motorcycle", "500 cc", "47.5 PS", "Up to 25 km/l*", "207 kg*"],
    ["keeway-k300n", "Keeway K300 N", "Keeway", "Motorcycle", "292 cc", "27.5 PS", "Up to 30 km/l*", "160 kg*"],
    ["keeway-vieste-300", "Keeway Vieste 300", "Keeway", "Scooter", "278 cc", "25.2 PS", "Up to 28 km/l*", "189 kg*"],
    ["keeway-sr-250", "Keeway SR 250", "Keeway", "Motorcycle", "249 cc", "20 PS", "Up to 35 km/l*", "154 kg*"],
    ["cfmoto-250nk", "CFMoto 250NK", "CFMoto", "Motorcycle", "249 cc", "26.5 PS", "Up to 32 km/l*", "158 kg*"],
    ["cfmoto-300nk", "CFMoto 300NK", "CFMoto", "Motorcycle", "292 cc", "29 PS", "Up to 30 km/l*", "158 kg*"],
    ["cfmoto-450sr", "CFMoto 450SR", "CFMoto", "Motorcycle", "449 cc", "50 PS", "Up to 25 km/l*", "179 kg*"],
    ["harley-davidson-x440", "Harley-Davidson X440", "Harley-Davidson", "Motorcycle", "440 cc", "27 PS", "Up to 30 km/l*", "190 kg*"],
    ["triumph-speed-400", "Triumph Speed 400", "Triumph", "Motorcycle", "398 cc", "40 PS", "Up to 32 km/l*", "170 kg*"],
    ["triumph-scrambler-400x", "Triumph Scrambler 400X", "Triumph", "Motorcycle", "398 cc", "40 PS", "Up to 30 km/l*", "179 kg*"],
    ["bmw-g310r", "BMW G 310 R", "BMW", "Motorcycle", "313 cc", "34 PS", "Up to 32 km/l*", "158 kg*"],
    ["bmw-g310gs", "BMW G 310 GS", "BMW", "Motorcycle", "313 cc", "34 PS", "Up to 30 km/l*", "169 kg*"],
  ] as OtherInput[]
).map(other);

export const COMPARE_MODELS: CompareModel[] = [...TVS_COMPARE, ...OTHER_COMPARE];

export const COMPARE_BRANDS = Array.from(
  new Set(COMPARE_MODELS.map((model) => model.brand))
);

export const COMPARE_FIELDS: Array<{
  label: string;
  key: keyof Pick<
    CompareModel,
    "brand" | "type" | "engine" | "power" | "mileage" | "weight" | "fuel" | "price"
  >;
}> = [
  { label: "Brand", key: "brand" },
  { label: "Category", key: "type" },
  { label: "Engine / Motor", key: "engine" },
  { label: "Power", key: "power" },
  { label: "Mileage / Range", key: "mileage" },
  { label: "Kerb Weight", key: "weight" },
  { label: "Fuel", key: "fuel" },
  { label: "Price", key: "price" },
];

export function getCompareModel(id: string): CompareModel | undefined {
  return COMPARE_MODELS.find((model) => model.id === id);
}

export function searchCompareModels(query: string): CompareModel[] {
  const term = query.trim().toLowerCase();
  if (!term) return COMPARE_MODELS;
  return COMPARE_MODELS.filter((model) =>
    `${model.name} ${model.brand} ${model.type} ${model.fuel}`
      .toLowerCase()
      .includes(term)
  );
}
