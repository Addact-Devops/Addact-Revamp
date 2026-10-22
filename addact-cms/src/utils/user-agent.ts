export interface ParsedUserAgent {
  browser: string;
  os: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet' | 'Unknown';
}

export function parseUserAgent(uaString?: string): ParsedUserAgent {
  if (!uaString) {
    return {
      browser: 'Unknown Browser',
      os: 'Unknown OS',
      deviceType: 'Unknown',
    };
  }

  const ua = uaString;

  // OS Detection
  let os = 'Unknown OS';
  if (/windows/i.test(ua)) {
    if (/nt 10\.0/i.test(ua)) os = 'Windows 10/11';
    else if (/nt 6\.3/i.test(ua)) os = 'Windows 8.1';
    else if (/nt 6\.2/i.test(ua)) os = 'Windows 8';
    else if (/nt 6\.1/i.test(ua)) os = 'Windows 7';
    else os = 'Windows';
  } else if (/macintosh|mac os x/i.test(ua)) {
    os = 'macOS';
  } else if (/android/i.test(ua)) {
    os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    os = 'iOS';
  } else if (/linux/i.test(ua)) {
    os = 'Linux';
  }

  // Device Type Detection
  let deviceType: ParsedUserAgent['deviceType'] = 'Desktop';
  if (/ipad|tablet|playbook|silk/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))) {
    deviceType = 'Tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    deviceType = 'Mobile';
  }

  // Browser Detection
  let browser = 'Unknown Browser';
  const edgeMatch = ua.match(/(edg|edge)\/(\d+(\.\d+)?)/i);
  const operaMatch = ua.match(/(opr|opera)\/(\d+(\.\d+)?)/i);
  const chromeMatch = ua.match(/chrome\/(\d+(\.\d+)?)/i);
  const firefoxMatch = ua.match(/firefox\/(\d+(\.\d+)?)/i);
  const safariMatch = ua.match(/version\/(\d+(\.\d+)?).*safari/i);

  if (edgeMatch) {
    browser = `Edge ${edgeMatch[2].split('.')[0]}`;
  } else if (operaMatch) {
    browser = `Opera ${operaMatch[2].split('.')[0]}`;
  } else if (chromeMatch) {
    browser = `Chrome ${chromeMatch[1].split('.')[0]}`;
  } else if (firefoxMatch) {
    browser = `Firefox ${firefoxMatch[1].split('.')[0]}`;
  } else if (safariMatch) {
    browser = `Safari ${safariMatch[1].split('.')[0]}`;
  }

  return { browser, os, deviceType };
}
