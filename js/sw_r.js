// Register a Service Worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(function() {
		console.log('Registered!');
	})
	.catch(function() {
		console.log('Registered fails!');
	});
}