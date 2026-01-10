const getURL = async () => {
    let url = "";
    try {
        const res = await fetch("https://pinattutaro.github.io/dcon_kumap/url.txt");
        url = (await res.text()).trim();
    } catch (err) {
        console.error("Error fetching URL:", err);
    }
    return url;
}

const main = async () => {
    const lat = 0;
    const lon = 0;
    const imgBuffer = require("fs").readFileSync(__dirname + "/image.png");
    const imgBlob = new Blob([imgBuffer], { type: 'image/png' });

    const formData = new FormData();
    formData.append("lat", lat);
    formData.append("lon", lon);
    formData.append('image', imgBlob, 'image.png');

    const url = await getURL();

    const response = await fetch(`${url}/upload`, {
        method: "POST",
        body: formData
    });

    const result = await response.text();
    console.log(result);
}

main();