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

export interface Appliance {
  id: string;
  name: string;
  power: number;
  icon: string;
  IconComponent: React.ComponentType<{ className?: string }>;
}

export const appliances: Appliance[] = [
  { id: 'tv', name: 'Television', power: 150, icon: '📺', IconComponent: Tv },
  { id: 'fan', name: 'Ceiling Fan', power: 75, icon: '🌀', IconComponent: Fan },
  { id: 'fridge', name: 'Refrigerator', power: 150, icon: '🧊', IconComponent: Refrigerator },
  { id: 'cooler', name: 'Air Cooler', power: 200, icon: '🌬️', IconComponent: Wind },
  { id: 'ac', name: 'Air Conditioner', power: 1500, icon: '❄️', IconComponent: Snowflake },
  { id: 'mixer', name: 'Mixer Grinder', power: 500, icon: '🥤', IconComponent: Blend },
  { id: 'washer', name: 'Washing Machine', power: 500, icon: '🧺', IconComponent: WashingMachine },
  { id: 'microwave', name: 'Microwave Oven', power: 1200, icon: '🔥', IconComponent: Microwave },
  { id: 'heater', name: 'Room Heater', power: 2000, icon: '🔥', IconComponent: Flame },
  { id: 'geyser', name: 'Water Geyser', power: 2000, icon: '💧', IconComponent: Droplets },
  { id: 'led', name: 'LED Bulb', power: 10, icon: '💡', IconComponent: Lightbulb },
  { id: 'tube', name: 'Tube Light', power: 40, icon: '💡', IconComponent: LampDesk },
];
