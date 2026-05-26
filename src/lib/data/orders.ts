import type { Order } from '@/types'

// Dates spread across Dec 2025 – May 2026 so the 6-month revenue chart
// always contains real data relative to today (2026-05-26).
export const MOCK_ORDERS: Order[] = [
  // ── December 2025 ────────────────────────────────────────────────────────
  {
    id: '1', orderNumber: 'ORD-0001', customerName: 'Alice Johnson', customerEmail: 'alice@example.com',
    items: [{ productName: 'Wireless Noise-Cancelling Headphones', quantity: 1, unitPrice: 299.99 }, { productName: 'USB-C Hub 7-in-1', quantity: 2, unitPrice: 49.99 }],
    total: 399.97, status: 'delivered', createdAt: '2025-12-03',
  },
  {
    id: '2', orderNumber: 'ORD-0002', customerName: 'Bob Martinez', customerEmail: 'bob@example.com',
    items: [{ productName: 'Mechanical Gaming Keyboard', quantity: 1, unitPrice: 149.99 }],
    total: 149.99, status: 'delivered', createdAt: '2025-12-10',
  },
  {
    id: '3', orderNumber: 'ORD-0003', customerName: 'Carol White', customerEmail: 'carol@example.com',
    items: [{ productName: 'Ergonomic Office Chair', quantity: 1, unitPrice: 449.00 }, { productName: 'Standing Desk Converter', quantity: 1, unitPrice: 189.99 }],
    total: 638.99, status: 'delivered', createdAt: '2025-12-18',
  },
  // ── January 2026 ──────────────────────────────────────────────────────────
  {
    id: '4', orderNumber: 'ORD-0004', customerName: 'David Lee', customerEmail: 'david@example.com',
    items: [{ productName: 'Atomic Habits', quantity: 2, unitPrice: 18.99 }, { productName: 'The Art of Thinking Clearly', quantity: 1, unitPrice: 16.99 }],
    total: 54.97, status: 'delivered', createdAt: '2026-01-05',
  },
  {
    id: '5', orderNumber: 'ORD-0005', customerName: 'Eva Singh', customerEmail: 'eva@example.com',
    items: [{ productName: 'Ultra-Wide Monitor 34', quantity: 1, unitPrice: 699.00 }],
    total: 699.00, status: 'delivered', createdAt: '2026-01-14',
  },
  {
    id: '6', orderNumber: 'ORD-0006', customerName: 'Frank Zhang', customerEmail: 'frank@example.com',
    items: [{ productName: 'Yoga Mat Premium', quantity: 1, unitPrice: 68.00 }, { productName: 'Athletic Running Shorts', quantity: 2, unitPrice: 38.00 }],
    total: 144.00, status: 'delivered', createdAt: '2026-01-22',
  },
  // ── February 2026 ─────────────────────────────────────────────────────────
  {
    id: '7', orderNumber: 'ORD-0007', customerName: 'Grace Kim', customerEmail: 'grace@example.com',
    items: [{ productName: 'Merino Wool Crew Neck Sweater', quantity: 3, unitPrice: 89.99 }],
    total: 269.97, status: 'cancelled', createdAt: '2026-02-02',
  },
  {
    id: '8', orderNumber: 'ORD-0008', customerName: 'Henry Patel', customerEmail: 'henry@example.com',
    items: [{ productName: 'Adjustable Dumbbell Set', quantity: 1, unitPrice: 349.00 }],
    total: 349.00, status: 'delivered', createdAt: '2026-02-08',
  },
  {
    id: '9', orderNumber: 'ORD-0009', customerName: 'Isla Robinson', customerEmail: 'isla@example.com',
    items: [{ productName: 'USB-C Hub 7-in-1', quantity: 1, unitPrice: 49.99 }, { productName: 'Mechanical Gaming Keyboard', quantity: 1, unitPrice: 149.99 }],
    total: 199.98, status: 'delivered', createdAt: '2026-02-17',
  },
  {
    id: '10', orderNumber: 'ORD-0010', customerName: 'James Turner', customerEmail: 'james@example.com',
    items: [{ productName: 'Leather Laptop Bag 15', quantity: 1, unitPrice: 159.00 }],
    total: 159.00, status: 'delivered', createdAt: '2026-02-24',
  },
  // ── March 2026 ────────────────────────────────────────────────────────────
  {
    id: '11', orderNumber: 'ORD-0011', customerName: 'Karen Hughes', customerEmail: 'karen@example.com',
    items: [{ productName: 'Wireless Noise-Cancelling Headphones', quantity: 2, unitPrice: 299.99 }],
    total: 599.98, status: 'delivered', createdAt: '2026-03-04',
  },
  {
    id: '12', orderNumber: 'ORD-0012', customerName: 'Liam Chen', customerEmail: 'liam@example.com',
    items: [{ productName: 'Cold Brew Coffee Kit', quantity: 2, unitPrice: 42.00 }, { productName: 'Atomic Habits', quantity: 1, unitPrice: 18.99 }],
    total: 102.99, status: 'shipped', createdAt: '2026-03-11',
  },
  {
    id: '13', orderNumber: 'ORD-0013', customerName: 'Mia Nguyen', customerEmail: 'mia@example.com',
    items: [{ productName: 'Ergonomic Office Chair', quantity: 1, unitPrice: 449.00 }],
    total: 449.00, status: 'delivered', createdAt: '2026-03-20',
  },
  // ── April 2026 ────────────────────────────────────────────────────────────
  {
    id: '14', orderNumber: 'ORD-0014', customerName: 'Noah Williams', customerEmail: 'noah@example.com',
    items: [{ productName: 'Athletic Running Shorts', quantity: 1, unitPrice: 38.00 }, { productName: 'Yoga Mat Premium', quantity: 1, unitPrice: 68.00 }],
    total: 106.00, status: 'delivered', createdAt: '2026-04-01',
  },
  {
    id: '15', orderNumber: 'ORD-0015', customerName: 'Olivia Brown', customerEmail: 'olivia@example.com',
    items: [{ productName: 'Ultra-Wide Monitor 34', quantity: 1, unitPrice: 699.00 }, { productName: 'Mechanical Gaming Keyboard', quantity: 1, unitPrice: 149.99 }],
    total: 848.99, status: 'shipped', createdAt: '2026-04-09',
  },
  {
    id: '16', orderNumber: 'ORD-0016', customerName: 'Peter Garcia', customerEmail: 'peter@example.com',
    items: [{ productName: 'Portable Bluetooth Speaker', quantity: 1, unitPrice: 129.99 }],
    total: 129.99, status: 'delivered', createdAt: '2026-04-15',
  },
  {
    id: '17', orderNumber: 'ORD-0017', customerName: 'Quinn Davis', customerEmail: 'quinn@example.com',
    items: [{ productName: 'The Art of Thinking Clearly', quantity: 3, unitPrice: 16.99 }],
    total: 50.97, status: 'delivered', createdAt: '2026-04-22',
  },
  // ── May 2026 ──────────────────────────────────────────────────────────────
  {
    id: '18', orderNumber: 'ORD-0018', customerName: 'Rachel Wilson', customerEmail: 'rachel@example.com',
    items: [{ productName: 'Adjustable Dumbbell Set', quantity: 2, unitPrice: 349.00 }],
    total: 698.00, status: 'processing', createdAt: '2026-05-05',
  },
  {
    id: '19', orderNumber: 'ORD-0019', customerName: 'Samuel Moore', customerEmail: 'samuel@example.com',
    items: [{ productName: 'Merino Wool Crew Neck Sweater', quantity: 1, unitPrice: 89.99 }, { productName: 'USB-C Hub 7-in-1', quantity: 1, unitPrice: 49.99 }],
    total: 139.98, status: 'pending', createdAt: '2026-05-12',
  },
  {
    id: '20', orderNumber: 'ORD-0020', customerName: 'Tina Jackson', customerEmail: 'tina@example.com',
    items: [{ productName: 'Wireless Noise-Cancelling Headphones', quantity: 1, unitPrice: 299.99 }, { productName: 'Ergonomic Office Chair', quantity: 1, unitPrice: 449.00 }],
    total: 748.99, status: 'processing', createdAt: '2026-05-19',
  },
]
