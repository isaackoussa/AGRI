// Stocke et restitue les données de suivi AGRI (recettes agricoles),
// pour qu'elles soient synchronisées entre tous les appareils.

const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;

  if (!siteID || !token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "NETLIFY_SITE_ID ou NETLIFY_AUTH_TOKEN manquant dans les variables d'environnement." })
    };
  }

  const store = getStore({ name: 'agri-donnees', siteID, token });

  if (event.httpMethod === 'GET') {
    try {
      const value = await store.get('agri-data');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: value || null })
      };
    } catch (e) {
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: null }) };
    }
  }

  if (event.httpMethod === 'POST') {
    let payload;
    try {
      payload = JSON.parse(event.body || '{}');
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Corps de requête invalide' }) };
    }
    try {
      await store.set('agri-data', payload.value);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: true })
      };
    } catch (e) {
      return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
    }
  }

  return { statusCode: 405, body: 'Method not allowed' };
};
