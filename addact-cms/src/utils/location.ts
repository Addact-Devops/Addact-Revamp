import * as os from 'os';
import * as http from 'http';
import * as https from 'https';

const ipLocationCache = new Map<string, string>();

export async function getLocationFromIp(ip: string): Promise<string> {
  let targetIp = (ip || '').split(',')[0].trim();

  if (!targetIp || targetIp === 'Unknown IP' || targetIp === '127.0.0.1' || targetIp === '::1' || targetIp === 'localhost' || targetIp.startsWith('192.168.') || targetIp.startsWith('10.')) {
    targetIp = '';
  }

  if (targetIp && ipLocationCache.has(targetIp)) {
    return ipLocationCache.get(targetIp)!;
  }

  // 1. Primary: ip-api.com (HTTP)
  try {
    const loc1 = await new Promise<string>((resolve) => {
      const url = targetIp
        ? `http://ip-api.com/json/${targetIp}?fields=status,city,regionName,country,lat,lon`
        : `http://ip-api.com/json/?fields=status,city,regionName,country,lat,lon`;

      const req = http.get(url, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(rawData);
            if (parsed && parsed.status === 'success') {
              const parts = [parsed.city, parsed.regionName, parsed.country].filter(Boolean);
              let locStr = parts.join(', ');
              if (parsed.lat !== undefined && parsed.lon !== undefined) {
                locStr += ` (Lat: ${parsed.lat}, Lon: ${parsed.lon})`;
              }
              resolve(locStr);
            } else {
              resolve('');
            }
          } catch {
            resolve('');
          }
        });
      });

      req.on('error', () => resolve(''));
      req.setTimeout(2000, () => {
        req.destroy();
        resolve('');
      });
    });

    if (loc1) {
      if (targetIp) ipLocationCache.set(targetIp, loc1);
      return loc1;
    }
  } catch (e) {}

  // 2. Fallback: ipapi.co (HTTPS)
  try {
    const loc2 = await new Promise<string>((resolve) => {
      const url = targetIp ? `https://ipapi.co/${targetIp}/json/` : `https://ipapi.co/json/`;
      const options = {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      };

      const req = https.get(url, options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(rawData);
            if (parsed && parsed.city) {
              const parts = [parsed.city, parsed.region, parsed.country_name].filter(Boolean);
              let locStr = parts.join(', ');
              if (parsed.latitude !== undefined && parsed.longitude !== undefined) {
                locStr += ` (Lat: ${parsed.latitude}, Lon: ${parsed.longitude})`;
              }
              resolve(locStr);
            } else {
              resolve('');
            }
          } catch {
            resolve('');
          }
        });
      });

      req.on('error', () => resolve(''));
      req.setTimeout(2000, () => {
        req.destroy();
        resolve('');
      });
    });

    if (loc2) {
      if (targetIp) ipLocationCache.set(targetIp, loc2);
      return loc2;
    }
  } catch (e) {}

  return 'Localhost / Internal';
}

export const SERVER_SYSTEM_USER = (() => {
  try {
    return os.userInfo().username || os.hostname() || 'Unknown';
  } catch {
    return os.hostname() || 'Unknown';
  }
})();

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function sanitizeClientId(headerVal: any): string | null {
  if (!headerVal || typeof headerVal !== 'string') return null;
  const val = headerVal.trim();
  return UUID_REGEX.test(val) ? val : null;
}
