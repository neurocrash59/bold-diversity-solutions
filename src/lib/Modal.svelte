<script>
	import { createEventDispatcher } from 'svelte';

	export let header;
	let modal;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
</script>

<div class="backdrop z-80" on:click={close} />
<!-- Modal -->
<div
	class="modal z-90 border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none"
	bind:this={modal}
	aria-modal="true"
>
	<!-- Header -->
	<div class="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
		<h3 class="text-3xl font-semibold">{header}</h3>
		<button
			class="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
			on:click={close}
		>
			<span
				class="bg-transparent h-6 w-6 text-2xl text-gray-900 block outline-none focus:outline-none"
			>
				<i class="fas fa-times" />
			</span>
		</button>
	</div>
	<!-- Body -->
	<div class="flex-auto w-full p-6 m-auto rounded-md shadow-md">
		<slot />
	</div>
</div>

<style>
	.backdrop {
		height: 100%;
		width: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.6);
	}

	.modal {
		margin: 10% auto;
		max-width: 40%;
		left: 50%;
		transform: translate(-50%, 0);
		position: absolute;
		overflow: auto;
	}

	@media screen and (max-width: 768px) {
		.modal {
			max-width: 75%;
		}
	}
</style>
