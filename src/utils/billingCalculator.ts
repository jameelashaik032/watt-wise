import { LTCategory } from '@/contexts/UserContext';

interface SlabRate {
  min: number;
  max: number;
  energyRate: number;
  customerCharge: number;
}

const LT_I_SLABS: SlabRate[] = [
  { min: 0, max: 30, energyRate: 1.90, customerCharge: 25 },
  { min: 31, max: 75, energyRate: 3.00, customerCharge: 30 },
  { min: 76, max: 125, energyRate: 4.50, customerCharge: 45 },
  { min: 126, max: 225, energyRate: 6.00, customerCharge: 50 },
  { min: 226, max: 400, energyRate: 8.75, customerCharge: 55 },
  { min: 401, max: Infinity, energyRate: 9.75, customerCharge: 55 },
];

const LT_II_SLABS: SlabRate[] = [
  { min: 0, max: 50, energyRate: 5.40, customerCharge: 30 },
  { min: 51, max: 100, energyRate: 7.65, customerCharge: 40 },
  { min: 101, max: 300, energyRate: 9.05, customerCharge: 45 },
  { min: 301, max: 500, energyRate: 9.60, customerCharge: 45 },
  { min: 501, max: Infinity, energyRate: 10.15, customerCharge: 45 },
];

export const calculateUnits = (powerWatts: number, hours: number, minutes: number): number => {
  const totalHours = hours + (minutes / 60);
  const units = (powerWatts * totalHours) / 1000;
  return Math.round(units * 1000) / 1000;
};

export const getSlabRate = (units: number, category: LTCategory): SlabRate => {
  const slabs = category === 'LT-I' ? LT_I_SLABS : LT_II_SLABS;
  const slab = slabs.find(s => units >= s.min && units <= s.max);
  return slab || slabs[slabs.length - 1];
};

export const calculateBill = (
  powerWatts: number, 
  hours: number, 
  minutes: number, 
  category: LTCategory
) => {
  const units = calculateUnits(powerWatts, hours, minutes);
  const slab = getSlabRate(units, category);
  
  const energyCost = Math.round(units * slab.energyRate * 100) / 100;
  const customerCharge = slab.customerCharge;
  const totalCost = Math.round((energyCost + customerCharge) * 100) / 100;
  
  return {
    units,
    ratePerUnit: slab.energyRate,
    energyCost,
    customerCharge,
    totalCost
  };
};

export const getSlabLabel = (units: number, category: LTCategory): string => {
  if (category === 'LT-I') {
    if (units <= 30) return '0–30 kWh';
    if (units <= 75) return '31–75 kWh';
    if (units <= 125) return '76–125 kWh';
    if (units <= 225) return '126–225 kWh';
    if (units <= 400) return '226–400 kWh';
    return '>400 kWh';
  } else {
    if (units <= 50) return '0–50 kWh';
    if (units <= 100) return '51–100 kWh';
    if (units <= 300) return '101–300 kWh';
    if (units <= 500) return '301–500 kWh';
    return '>500 kWh';
  }
};

export const calculateCumulativeBill = (totalUnits: number, category: LTCategory) => {
  const slab = getSlabRate(totalUnits, category);
  const slabLabel = getSlabLabel(totalUnits, category);
  
  const energyCost = Math.round(totalUnits * slab.energyRate * 100) / 100;
  const customerCharge = slab.customerCharge;
  const totalCost = Math.round((energyCost + customerCharge) * 100) / 100;
  
  return {
    totalUnits: Math.round(totalUnits * 1000) / 1000,
    slabLabel,
    ratePerUnit: slab.energyRate,
    energyCost,
    customerCharge,
    totalCost
  };
};
