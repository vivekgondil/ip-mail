const publicIp = require('public-ip');

(async () => {
    let ip = 
	await publicIp.v4({
		fallbackUrls: [
			'https://ifconfig.co/ip'
		]
	});
    console.log(ip);
})();