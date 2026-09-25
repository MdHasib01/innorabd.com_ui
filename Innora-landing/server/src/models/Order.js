import mongoose from 'mongoose';
import { campaign } from '../config/campaign.js';

const bdPhone = [/^01[3-9]\d{8}$/, 'Invalid Bangladeshi mobile number'];

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true, trim: true, maxlength: 120 },
      phone: { type: String, required: true, match: bdPhone },
      address: { type: String, required: true, trim: true, maxlength: 500 },
    },
    variant: { type: String, enum: campaign.variants, required: true },
    quantity: { type: Number, required: true, min: 1, max: campaign.maxQty },
    unitPrice: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    tickets: { type: [String], default: [] },
    paymentMethod: { type: String, enum: ['cod', 'advance'], required: true },
    advancePayment: {
      provider: { type: String, enum: ['bKash', 'Nagad'] },
      senderNumber: { type: String, match: bdPhone },
      trxId: { type: String, trim: true, uppercase: true, maxlength: 40 },
    },
    status: {
      type: String,
      enum: ['pending', 'payment_review', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    lang: { type: String, enum: ['bn', 'en'], default: 'bn' },
  },
  { timestamps: true },
);

orderSchema.index({ 'advancePayment.trxId': 1 }, { unique: true, sparse: true });

export const Order = mongoose.model('Order', orderSchema);
