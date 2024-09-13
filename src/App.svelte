<script>
 import Tasks from './components/Taks.svelte'
</script>

<main>
	<h1>Todo App</h1>
	<Tasks/>
</main>

<style>
	main{
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-evenly;
		gap: 2rem;
		color:rgb(145, 143, 143);
	}
	h1{
		color: #000000;
		font-size: 3rem;
	}
</style>