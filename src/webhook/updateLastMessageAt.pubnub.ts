/* eslint-disable @typescript-eslint/no-var-requires */
export default async (request) => {
  const body = { chatGroupId: request.channels[0] };
  const vault = require('vault');
  const apiKey = await vault.get('API_KEY');
  const apiURL = await vault.get('API_URL');

  const xhr = require('xhr');
  const post = { method: 'POST', body, headers: { 'x-api-key': apiKey } };
  const url = `${apiURL}/v1/message/update/last-message-at`;

  return xhr
    .fetch(url, post)
    .then(() => {
      return request.ok();
    })
    .catch(() => {
      return request.abort();
    });
};
