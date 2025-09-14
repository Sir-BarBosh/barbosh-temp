
export default function handler(req, res) {
  res.status(429).json({ message: 'Too many requests' });
}
