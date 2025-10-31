eagle.onPluginCreate((plugin) => {
	console.log('eagle.onPluginCreate');
	console.log(plugin);
	document.querySelector('#message').innerHTML = `
	<ul>
		<li>id: ${plugin.manifest.id}</li>
		<li>version: ${plugin.manifest.version}</li>
		<li>name: ${plugin.manifest.name}</li>
		<li>logo: ${plugin.manifest.logo}</li>
		<li>path: ${plugin.path}</li>
	</ul>
	`;
});

eagle.onPluginRun(() => {
	console.log('eagle.onPluginRun');
});

eagle.onPluginShow(async () => {
	console.log('eagle.onPluginShow');

	try {
		const tagGroups = await eagle.tagGroup.get();
		console.log('取得したタググループ: ', tagGroups);
	} catch (error) {
		console.error('タググループの取得に失敗しました:', error);
	}
});

eagle.onPluginHide(() => {
	console.log('eagle.onPluginHide');
});

eagle.onPluginBeforeExit((event) => {
	console.log('eagle.onPluginBeforeExit');
});