// API utilities for safe header handling

/**
 * Sanitize API key to remove problematic characters
 * HTTP headers must only contain ASCII printable characters for maximum compatibility
 */
export function sanitizeApiKey(key?: string): string | null {
  if (!key) return null
  
  try {
    // Remove all non-ASCII printable characters (only allow space, !, #, $, %, &, ', *, +, -, ., /, 0-9, :, =, ?, A-Z, a-z)
    const sanitized = key.replace(/[^\x20-\x7E]/g, '').trim()
    
    // Basic API key format validation
    if (sanitized.length < 10 || sanitized.length > 200) {
      console.warn('Invalid API key length after sanitization:', sanitized.length)
      return null
    }
    
    console.log('🔧 Sanitized API key:', sanitized)
    return sanitized
  } catch (error) {
    console.error('Failed to sanitize API key:', error)
    return null
  }
}

/**
 * Create safe Authorization header
 */
export function createAuthHeader(token: string): string {
  const sanitized = sanitizeApiKey(token)
  if (!sanitized) {
    throw new Error('Invalid token: contains unsupported characters')
  }
  return `Bearer ${sanitized}`
}