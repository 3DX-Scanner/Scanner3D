<script lang="ts">
	async function logout() {
		const res = await fetch('/api/logout', {
			method: 'POST'
		});

		if (res.ok) {
			window.location.href = '/home';
		}
	}
</script>

<h1>Bienvenue</h1>
<h1>Bienvenue</h1>
<h1>Bienvenue</h1>
<button on:click={logout}>Se déconnecter</button>
