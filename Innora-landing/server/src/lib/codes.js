import crypto from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomCode(len) {
  const bytes = crypto.randomBytes(len);
  let out = '';
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

export const orderNumber = () => `INB-${Date.now().toString(36).toUpperCase()}-${randomCode(4)}`;
export const ticketSerials = (count) => Array.from({ length: count }, () => `CXB-${randomCode(8)}`);
