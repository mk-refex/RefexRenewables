import jwt from 'jsonwebtoken';

export function signToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  return jwt.sign(payload, secret, { expiresIn });
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }
  const token = header.slice('Bearer '.length);
  try {
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireAdmin(req, res, next) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: No user found in request' });
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Forbidden: Admin access required',
      userRole: user.role 
    });
  }
  next();
}

export function requireInvestorAccess(req, res, next) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: No user found in request' });
  }
  
  // Admins have all access
  if (user.role === 'admin' || user.permissions === null) {
    return next();
  }
  
  // Check if user has investor-relations permission
  if (user.permissions && Array.isArray(user.permissions) && user.permissions.includes('investor-relations')) {
    return next();
  }
  
  return res.status(403).json({ 
    message: 'Forbidden: Investor Relations access required',
    userRole: user.role,
    userPermissions: user.permissions
  });
}

/**
 * Middleware factory to check if user has access to a specific page
 * @param {string} pageId - The page identifier (e.g., 'investor-relations', 'about-us')
 * @returns {Function} Express middleware function
 */
export function requirePageAccess(pageId) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: No user found in request' });
    }
    
    // Admins have all access
    if (user.role === 'admin' || user.permissions === null) {
      return next();
    }
    
    // Check if user has permission for this page
    if (user.permissions && Array.isArray(user.permissions) && user.permissions.includes(pageId)) {
      return next();
    }
    
    return res.status(403).json({ 
      message: `Forbidden: Access to ${pageId} page required`,
      userRole: user.role,
      userPermissions: user.permissions,
      requiredPage: pageId
    });
  };
}
