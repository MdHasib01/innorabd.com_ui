import { Router } from 'express';
import { Order } from '../models/Order.js';
import { campaign, billFor, ticketsFor } from '../config/campaign.js';
import { orderNumber, ticketSerials } from '../lib/codes.js';

const router = Router();

function requireAdmin(req, res, next) {
  const token = process.env.ADMIN_TOKEN;
  if (!token || req.get('x-admin-token') !== token) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// Public campaign info for the landing page
router.get('/campaign', (_req, res) => {
  const hr = new Date().getHours();
  const ticketsLeft = Math.max(14, 75 - Math.floor((hr / 24) * 60));
  res.json({ ...campaign, ticketsLeft });
});

router.post('/orders', async (req, res, next) => {
  try {
    const { name, phone, address, variant, quantity, paymentMethod, advancePayment, lang } = req.body ?? {};
    const qty = Number.parseInt(quantity, 10);
    if (!Number.isInteger(qty) || qty < 1 || qty > campaign.maxQty) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    if (paymentMethod === 'advance' && (!advancePayment?.trxId || !advancePayment?.senderNumber || !advancePayment?.provider)) {
      return res.status(400).json({ error: 'Advance payment details are required' });
    }

    const bill = billFor(qty, paymentMethod);
    const order = await Order.create({
      orderNumber: orderNumber(),
      customer: { name, phone, address },
      variant,
      quantity: qty,
      unitPrice: campaign.unitPrice,
      ...bill,
      tickets: ticketSerials(ticketsFor(qty)),
      paymentMethod,
      advancePayment: paymentMethod === 'advance' ? advancePayment : undefined,
      status: paymentMethod === 'advance' ? 'payment_review' : 'pending',
      lang,
    });

    res.status(201).json({
      orderNumber: order.orderNumber,
      total: order.total,
      tickets: order.tickets,
      status: order.status,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/orders', requireAdmin, async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const filter = req.query.status ? { status: req.query.status } : {};
    const [items, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Order.countDocuments(filter),
    ]);
    res.json({ items, total, page, limit });
  } catch (err) {
    next(err);
  }
});

router.patch('/orders/:id/status', requireAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body?.status },
      { new: true, runValidators: true },
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
