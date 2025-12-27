import { 
  Tv, 
  Fan, 
  Refrigerator, 
  Wind, 
  Snowflake, 
  Blend, 
  WashingMachine, 
  Microwave,
  Flame,
  Droplets,
  Lightbulb,
  LampDesk
} from 'lucide-react';

export interface ApplianceModel {
  id: string;
  name: string;
  power: number;
  isDefault?: boolean;
}

export interface Appliance {
  id: string;
  name: string;
  power: number; // Average power (used for default)
  icon: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  models: ApplianceModel[];
}

export const appliances: Appliance[] = [
  { 
    id: 'tv', 
    name: 'Television', 
    power: 150, 
    icon: '📺', 
    IconComponent: Tv,
    models: [
      { id: 'tv-avg', name: '⭐ Average (Recommended)', power: 150, isDefault: true },
      { id: 'tv-led-32', name: '32" LED TV', power: 50 },
      { id: 'tv-led-43', name: '43" LED TV', power: 80 },
      { id: 'tv-led-55', name: '55" LED TV', power: 120 },
      { id: 'tv-oled-55', name: '55" OLED TV', power: 150 },
      { id: 'tv-led-65', name: '65" LED TV', power: 180 },
      { id: 'tv-oled-65', name: '65" OLED TV', power: 200 },
      { id: 'tv-crt', name: 'CRT TV (Old)', power: 300 },
    ]
  },
  { 
    id: 'fan', 
    name: 'Ceiling Fan', 
    power: 75, 
    icon: '🌀', 
    IconComponent: Fan,
    models: [
      { id: 'fan-avg', name: '⭐ Average (Recommended)', power: 75, isDefault: true },
      { id: 'fan-bldc', name: 'BLDC Fan (Energy Efficient)', power: 28 },
      { id: 'fan-standard', name: 'Standard Fan', power: 70 },
      { id: 'fan-high-speed', name: 'High Speed Fan', power: 80 },
      { id: 'fan-heavy-duty', name: 'Heavy Duty Fan', power: 100 },
      { id: 'fan-decorative', name: 'Decorative Fan', power: 85 },
      { id: 'fan-industrial', name: 'Industrial Fan', power: 120 },
    ]
  },
  { 
    id: 'fridge', 
    name: 'Refrigerator', 
    power: 150, 
    icon: '🧊', 
    IconComponent: Refrigerator,
    models: [
      { id: 'fridge-avg', name: '⭐ Average (Recommended)', power: 150, isDefault: true },
      { id: 'fridge-mini', name: 'Mini Fridge (50L)', power: 60 },
      { id: 'fridge-single-165', name: 'Single Door 165L', power: 100 },
      { id: 'fridge-single-200', name: 'Single Door 200L', power: 130 },
      { id: 'fridge-double-250', name: 'Double Door 250L', power: 150 },
      { id: 'fridge-double-350', name: 'Double Door 350L', power: 180 },
      { id: 'fridge-double-500', name: 'Double Door 500L', power: 220 },
      { id: 'fridge-side-by-side', name: 'Side-by-Side 600L+', power: 300 },
      { id: 'fridge-inverter', name: 'Inverter Technology', power: 90 },
    ]
  },
  { 
    id: 'cooler', 
    name: 'Air Cooler', 
    power: 200, 
    icon: '🌬️', 
    IconComponent: Wind,
    models: [
      { id: 'cooler-avg', name: '⭐ Average (Recommended)', power: 200, isDefault: true },
      { id: 'cooler-personal', name: 'Personal Cooler', power: 80 },
      { id: 'cooler-tower', name: 'Tower Cooler', power: 120 },
      { id: 'cooler-room', name: 'Room Cooler', power: 185 },
      { id: 'cooler-desert', name: 'Desert Cooler', power: 250 },
      { id: 'cooler-industrial', name: 'Industrial Cooler', power: 350 },
    ]
  },
  { 
    id: 'ac', 
    name: 'Air Conditioner', 
    power: 1500, 
    icon: '❄️', 
    IconComponent: Snowflake,
    models: [
      { id: 'ac-avg', name: '⭐ Average (Recommended)', power: 1500, isDefault: true },
      { id: 'ac-window-1', name: 'Window AC 1 Ton', power: 1200 },
      { id: 'ac-window-1.5', name: 'Window AC 1.5 Ton', power: 1500 },
      { id: 'ac-window-2', name: 'Window AC 2 Ton', power: 1800 },
      { id: 'ac-split-1', name: 'Split AC 1 Ton', power: 1100 },
      { id: 'ac-split-1.5', name: 'Split AC 1.5 Ton', power: 1500 },
      { id: 'ac-split-2', name: 'Split AC 2 Ton', power: 2000 },
      { id: 'ac-inverter-1', name: 'Inverter AC 1 Ton', power: 800 },
      { id: 'ac-inverter-1.5', name: 'Inverter AC 1.5 Ton', power: 1200 },
      { id: 'ac-inverter-2', name: 'Inverter AC 2 Ton', power: 1500 },
      { id: 'ac-5star', name: '5 Star Rated AC', power: 1000 },
    ]
  },
  { 
    id: 'mixer', 
    name: 'Mixer Grinder', 
    power: 500, 
    icon: '🥤', 
    IconComponent: Blend,
    models: [
      { id: 'mixer-avg', name: '⭐ Average (Recommended)', power: 500, isDefault: true },
      { id: 'mixer-basic', name: 'Basic Mixer', power: 300 },
      { id: 'mixer-standard', name: 'Standard Mixer', power: 500 },
      { id: 'mixer-heavy', name: 'Heavy Duty Mixer', power: 750 },
      { id: 'mixer-commercial', name: 'Commercial Mixer', power: 1000 },
      { id: 'mixer-juicer', name: 'Juicer Mixer', power: 400 },
    ]
  },
  { 
    id: 'washer', 
    name: 'Washing Machine', 
    power: 500, 
    icon: '🧺', 
    IconComponent: WashingMachine,
    models: [
      { id: 'washer-avg', name: '⭐ Average (Recommended)', power: 500, isDefault: true },
      { id: 'washer-semi-6', name: 'Semi-Auto 6kg', power: 360 },
      { id: 'washer-semi-8', name: 'Semi-Auto 8kg', power: 450 },
      { id: 'washer-top-6', name: 'Top Load 6kg', power: 400 },
      { id: 'washer-top-8', name: 'Top Load 8kg', power: 500 },
      { id: 'washer-front-6', name: 'Front Load 6kg', power: 500 },
      { id: 'washer-front-8', name: 'Front Load 8kg', power: 600 },
      { id: 'washer-front-10', name: 'Front Load 10kg', power: 750 },
      { id: 'washer-inverter', name: 'Inverter Washing Machine', power: 350 },
    ]
  },
  { 
    id: 'microwave', 
    name: 'Microwave Oven', 
    power: 1200, 
    icon: '🔥', 
    IconComponent: Microwave,
    models: [
      { id: 'microwave-avg', name: '⭐ Average (Recommended)', power: 1200, isDefault: true },
      { id: 'microwave-solo-20', name: 'Solo 20L', power: 800 },
      { id: 'microwave-solo-25', name: 'Solo 25L', power: 900 },
      { id: 'microwave-grill-20', name: 'Grill 20L', power: 1000 },
      { id: 'microwave-grill-25', name: 'Grill 25L', power: 1100 },
      { id: 'microwave-convection-25', name: 'Convection 25L', power: 1300 },
      { id: 'microwave-convection-32', name: 'Convection 32L', power: 1500 },
    ]
  },
  { 
    id: 'heater', 
    name: 'Room Heater', 
    power: 2000, 
    icon: '🔥', 
    IconComponent: Flame,
    models: [
      { id: 'heater-avg', name: '⭐ Average (Recommended)', power: 2000, isDefault: true },
      { id: 'heater-fan-1kw', name: 'Fan Heater 1000W', power: 1000 },
      { id: 'heater-fan-2kw', name: 'Fan Heater 2000W', power: 2000 },
      { id: 'heater-oil-9fin', name: 'Oil Filled 9 Fin', power: 2000 },
      { id: 'heater-oil-11fin', name: 'Oil Filled 11 Fin', power: 2400 },
      { id: 'heater-halogen', name: 'Halogen Heater', power: 1200 },
      { id: 'heater-quartz', name: 'Quartz Heater', power: 800 },
      { id: 'heater-convector', name: 'Convector Heater', power: 2000 },
      { id: 'heater-infrared', name: 'Infrared Heater', power: 1500 },
    ]
  },
  { 
    id: 'geyser', 
    name: 'Water Geyser', 
    power: 2000, 
    icon: '💧', 
    IconComponent: Droplets,
    models: [
      { id: 'geyser-avg', name: '⭐ Average (Recommended)', power: 2000, isDefault: true },
      { id: 'geyser-instant-3l', name: 'Instant 3L', power: 3000 },
      { id: 'geyser-instant-5l', name: 'Instant 5L', power: 4500 },
      { id: 'geyser-storage-10l', name: 'Storage 10L', power: 2000 },
      { id: 'geyser-storage-15l', name: 'Storage 15L', power: 2000 },
      { id: 'geyser-storage-25l', name: 'Storage 25L', power: 2000 },
      { id: 'geyser-solar', name: 'Solar Hybrid Geyser', power: 1500 },
    ]
  },
  { 
    id: 'led', 
    name: 'LED Bulb', 
    power: 10, 
    icon: '💡', 
    IconComponent: Lightbulb,
    models: [
      { id: 'led-avg', name: '⭐ Average (Recommended)', power: 10, isDefault: true },
      { id: 'led-5w', name: 'LED 5W', power: 5 },
      { id: 'led-7w', name: 'LED 7W', power: 7 },
      { id: 'led-9w', name: 'LED 9W', power: 9 },
      { id: 'led-12w', name: 'LED 12W', power: 12 },
      { id: 'led-15w', name: 'LED 15W', power: 15 },
      { id: 'led-18w', name: 'LED 18W', power: 18 },
      { id: 'led-20w', name: 'LED 20W', power: 20 },
      { id: 'led-22w', name: 'LED 22W', power: 22 },
      { id: 'cfl-15w', name: 'CFL 15W', power: 15 },
      { id: 'incandescent-60w', name: 'Incandescent 60W', power: 60 },
      { id: 'incandescent-100w', name: 'Incandescent 100W', power: 100 },
    ]
  },
  { 
    id: 'tube', 
    name: 'Tube Light', 
    power: 40, 
    icon: '💡', 
    IconComponent: LampDesk,
    models: [
      { id: 'tube-avg', name: '⭐ Average (Recommended)', power: 40, isDefault: true },
      { id: 'tube-led-10w', name: 'LED Tube 10W', power: 10 },
      { id: 'tube-led-18w', name: 'LED Tube 18W', power: 18 },
      { id: 'tube-led-20w', name: 'LED Tube 20W', power: 20 },
      { id: 'tube-led-22w', name: 'LED Tube 22W', power: 22 },
      { id: 'tube-fluorescent-40w', name: 'Fluorescent 40W', power: 40 },
      { id: 'tube-fluorescent-36w', name: 'Fluorescent 36W', power: 36 },
      { id: 'tube-t5-28w', name: 'T5 Tube 28W', power: 28 },
    ]
  },
];
