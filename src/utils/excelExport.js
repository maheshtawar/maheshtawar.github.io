// ==========================================
// EXCEL / SPREADSHEET STORAGE & EXPORT UTILITY
// Stores contact messages and exports them to Excel (.csv format with UTF-8 BOM)
// ==========================================

const STORAGE_KEY = 'mahesh_portfolio_contact_messages';

/**
 * Get all contact messages stored in browser database
 * @returns {Array} List of message objects
 */
export const getStoredMessages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading contact messages from localStorage:', err);
    return [];
  }
};

/**
 * Save a new contact inquiry to the local database
 * @param {Object} messageData { name, email, subject, message }
 * @returns {Array} Updated list of messages
 */
export const saveMessageToStore = ({ name, email, subject, message }) => {
  try {
    const current = getStoredMessages();
    const newEntry = {
      id: `msg_${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      isoDate: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving message to localStorage:', err);
    return [];
  }
};

/**
 * Clear stored messages (optional admin utility)
 */
export const clearStoredMessages = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing messages:', err);
  }
};

/**
 * Convert an array of messages to Excel-compatible CSV string with UTF-8 BOM
 * and trigger instant browser download.
 * @param {Array} [messages] Optional messages list, defaults to all stored messages
 * @returns {boolean} True if download was triggered
 */
export const exportMessagesToExcel = (messages = null) => {
  const data = messages || getStoredMessages();

  if (!data || data.length === 0) {
    alert('No contact messages to export yet. Submit a message through the contact form first!');
    return false;
  }

  // Define headers for Excel
  const headers = ['ID', 'Date & Time (IST)', 'Full Name', 'Email Address', 'Topic / Role', 'Message'];

  // Helper to escape CSV fields safely for Excel
  const escapeCell = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  // Build CSV rows
  const csvRows = [];
  csvRows.push(headers.map(escapeCell).join(','));

  data.forEach((row) => {
    csvRows.push([
      escapeCell(row.id),
      escapeCell(row.timestamp),
      escapeCell(row.name),
      escapeCell(row.email),
      escapeCell(row.subject),
      escapeCell(row.message),
    ].join(','));
  });

  const csvContent = csvRows.join('\r\n');

  // \uFEFF is the UTF-8 Byte Order Mark (BOM) ensuring Excel recognizes characters & columns properly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Mahesh_Portfolio_Contact_Messages_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
};

/**
 * Optional: Sync to Google Sheets / Excel Web App if an endpoint is provided
 * @param {Object} messageData
 * @param {string} endpointUrl
 */
export const syncToGoogleSheet = async (messageData, endpointUrl) => {
  if (!endpointUrl || !endpointUrl.startsWith('http')) return false;

  try {
    await fetch(endpointUrl, {
      method: 'POST',
      mode: 'no-cors', // standard for Google Apps Script Web Apps
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...messageData,
      }),
    });
    return true;
  } catch (err) {
    console.warn('Failed to sync to Google Sheet webhook:', err);
    return false;
  }
};
