import { SizeRecommendation, CategoryType } from '../types';

export function calculateBraSize(underbustInches: number, bustInches: number): SizeRecommendation {
  // Rounded underbust to nearest half/whole
  const rawUnderbust = Math.round(underbustInches);
  
  // Standard band calculation: if odd, add 1 or 3 to make even, or standard snug band calculation
  let bandSize = rawUnderbust % 2 === 0 ? rawUnderbust + 2 : rawUnderbust + 3;
  if (rawUnderbust <= 27) bandSize = 30;
  if (rawUnderbust >= 41) bandSize = 42;

  // Cup difference = Full Bust - Band Size (or Full Bust - Underbust)
  // Industry gold standard difference: Bust - Band
  const diff = bustInches - bandSize;

  let cupSize = 'B';
  if (diff <= 0.5) cupSize = 'A';
  else if (diff <= 1.5) cupSize = 'B';
  else if (diff <= 2.5) cupSize = 'C';
  else if (diff <= 3.5) cupSize = 'D';
  else if (diff <= 4.5) cupSize = 'DD/E';
  else if (diff <= 5.5) cupSize = 'F';
  else cupSize = 'F+';

  // Cup letter progression for sister sizing
  const cups = ['A', 'B', 'C', 'D', 'DD/E', 'F'];
  const cupIdx = cups.indexOf(cupSize);

  // Sister Size Tight (One band down, one cup up)
  let sisterSizeTight = 'N/A';
  if (bandSize > 30 && cupIdx < cups.length - 1 && cupIdx >= 0) {
    sisterSizeTight = `${bandSize - 2}${cups[cupIdx + 1]}`;
  }

  // Sister Size Loose (One band up, one cup down)
  let sisterSizeLoose = 'N/A';
  if (bandSize < 42 && cupIdx > 0) {
    sisterSizeLoose = `${bandSize + 2}${cups[cupIdx - 1]}`;
  }

  const fitTips: string[] = [
    `Hook your new bra on the loosest hook first to prolong elasticity lifespan.`,
    `Do the "Scoop & Swoop" when putting on to ensure all breast tissue is cradled inside the cup.`,
    `If the band feels snug at first, wear your loose sister size (${sisterSizeLoose !== 'N/A' ? sisterSizeLoose : `${bandSize + 2}B`}) during week 1 as memory fabric softens.`,
  ];

  let recommendedCategory: CategoryType = 'Luxury Lace';
  if (cupIdx >= 3) {
    recommendedCategory = 'Push-Up & Balconette';
    fitTips.push('For fuller cup sizes, our 3-panel balconette offers maximum lift with minimal shoulder strain.');
  } else {
    recommendedCategory = 'Wireless & Bralette';
    fitTips.push('Plunge and corded lace styles accentuate your natural cleavage profile beautifully.');
  }

  return {
    bandSize,
    cupSize,
    underbustInches,
    bustInches,
    sisterSizeTight,
    sisterSizeLoose,
    fitTips,
    recommendedCategory,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
