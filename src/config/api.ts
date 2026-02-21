const API_BASE = "http://localhost:5000/api";

console.log('🌐 API_BASE loaded:', API_BASE);

export const API_CONFIG = {
  EMPLOYEE: `${API_BASE}/emp`,
  ADMIN: `${API_BASE}`, // Admin module uses standard /api/auth, /api/admin
  INTERVIEW: `${API_BASE}/interview`,
};

export default API_CONFIG;
