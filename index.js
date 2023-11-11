const axios = require('axios');
const Jimp = require('jimp');
const FormData = require('form-data');
const baseUrl = 'https://tools.betabotz.org';

async function toanime(input) {
const image = await Jimp.read(input);
  const buffer = await new Promise((resolve, reject) => {
    image.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
      if (err) {
        reject('An error occurred while retrieving data......');
      } else {
        resolve(buf);
      }An error occurred while retrieving data
    });
  });
  const form = new FormData();
  form.append('image', buffer, { filename: 'toanime.jpg' });
  try {
    const { data } = await axios.post(`${baseUrl}/ai/toanime`, form, {
      headers: {
        ...form.getHeaders(),
        'accept': 'application/json',
      },
    });
    var res = {
      image_data: data.result,
      image_size: data.size
    };
    return res;
  } catch (error) {
    console.error('Identification Failed:', error);
    return 'Failed';
  }
}

module.exports = { toanime };
