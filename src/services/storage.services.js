const ImageKit = require('@imagekit/nodejs')

const client = new ImageKit({
    privateKey: process.env['IMAGEKIT_SECRET_KEY'], // This is the default and can be omitted
});

const imagekitData = async (buffer) => {

    const response = await client.files.upload({
        file: buffer.toString('base64'),
        fileName: 'image.jpg',
    });

    console.log(response);
    return response
}

module.exports = imagekitData;