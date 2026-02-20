/**
 * Constructs natural language queries from CLI commands + options.
 * These queries are sent to the Shumi classification prompt server-side.
 */

export function buildCoinQuery(symbolOrName, options = {}) {
  let query = `Show me coin analysis for ${symbolOrName}`;
  if (options.interval === '1w') query += ' on weekly interval';
  if (options.history) query += ' with 24h historical comparison';
  if (options.noSentiment) query += ' without sentiment';
  return query;
}

export function buildMarketQuery(options = {}) {
  let query = 'Show me current market health overview';
  if (options.interval === '1w') query += ' on weekly interval';
  if (options.crossing) query += ' with trend crossings';
  return query;
}

export function buildSentimentQuery(options = {}) {
  if (options.coin) return `Show me sentiment for ${options.coin}`;
  if (options.category) return `Show me sentiment for the ${options.category} category`;
  if (options.narrative) return `Show me sentiment for the ${options.narrative} narrative`;

  let query = 'Show me current market sentiment';
  if (options.interval) query += ` on ${formatInterval(options.interval)} interval`;
  return query;
}

export function buildTrendsQuery(options = {}) {
  if (options.aligned) return buildAlignedQuery(options);

  const type = options.stale ? 'stale' : 'fresh';
  const label = type === 'stale' ? 'stale trends (longest running)' : 'fresh trends (newly started)';
  let query = `Show me ${label}`;
  if (options.interval === '1w') query += ' on weekly interval';
  if (options.limit) query += `, limit ${options.limit}`;
  return query;
}

function buildAlignedQuery(options = {}) {
  let query = 'Show me coins with aligned trends across all timeframes';
  if (options.limit) query += `, limit ${options.limit}`;
  return query;
}

export function buildScanQuery(options = {}) {
  const parts = ['Filter coins:'];
  if (options.trend) parts.push(`${options.trend} trend`);
  if (options.category) parts.push(`${options.category} category`);
  if (options.mcapMin) parts.push(`market cap min $${formatNumber(options.mcapMin)}`);
  if (options.mcapMax) parts.push(`market cap max $${formatNumber(options.mcapMax)}`);
  if (options.exchange) parts.push(`listed on ${options.exchange}`);
  if (options.limit) parts.push(`limit ${options.limit}`);
  if (options.interval === '1w') parts.push('weekly interval');

  if (parts.length === 1) parts.push('all coins sorted by market cap');
  return parts.join(' ');
}

export function buildCategoryQuery(name, options = {}) {
  if (!name) return 'Show me all categories';
  let query = `Show me the ${name} category trend breakdown`;
  if (options.interval === '1w') query += ' on weekly interval';
  return query;
}

export function buildNarrativesQuery(name, options = {}) {
  if (!name) {
    let query = 'Show me all current narratives';
    if (options.interval) query += ` on ${formatInterval(options.interval)} interval`;
    if (options.refresh) query += ' with fresh analysis';
    return query;
  }
  let query = `Show me the ${name} narrative sentiment`;
  if (options.interval) query += ` on ${formatInterval(options.interval)} interval`;
  if (options.refresh) query += ' with fresh analysis';
  return query;
}

export function buildDeltaNeutralQuery(options = {}) {
  let query = 'Show me delta-neutral funding rate arbitrage opportunities';
  if (options.exchange) query += ` on ${options.exchange}`;
  if (options.dexOnly) query += ', DEX only';
  if (options.symbol) query += ` for ${options.symbol}`;
  if (options.limit) query += `, limit ${options.limit}`;
  return query;
}

export function buildTweetsQuery(handle) {
  return `Show me recent tweets from ${handle}`;
}

export function buildSearchQuery(queryText, options = {}) {
  if (options.answer) return `Answer this question: ${queryText}`;
  return `Search the web for: ${queryText}`;
}

function formatInterval(interval) {
  const map = { '1h': '1 hour', '1d': '1 day', '1w': '1 week', '1m': '1 month' };
  return map[interval] || interval;
}

function formatNumber(n) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
}
