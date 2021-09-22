<script context="module">
	export function openModal() {
		document.querySelector('.loginModal').classList.remove('hidden');
		document.querySelector('.modalBackdrop').classList.remove('hidden');
	}
</script>

<script>
	function closeModal() {
		document.querySelector('.loginModal').classList.add('hidden');
		document.querySelector('.modalBackdrop').classList.add('hidden');
	}
</script>

<div
	class="loginModal hidden w-full h-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex flex-col justify-center items-center"
>
	<div class="relative w-auto my-6 mx-auto max-w-6xl">
		<!--content-->
		<div
			class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
		>
			<!--header-->
			<div
				class="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t"
			>
				<h3 class="text-3xl font-semibold">Login</h3>
				<button
					class="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
					on:click={closeModal}
				>
					<span
						class="bg-transparent h-6 w-6 text-2xl text-gray-900 block outline-none focus:outline-none"
					>
						<i class="fas fa-times" />
					</span>
				</button>
			</div>
			<!--body-->
			<div class="relative p-6 flex-auto">
				<form action="/" enctype="application/x-www-form-urlencoded">
					<div class="mb-3">
						<input
							class="rounded border-1 shadow-sm outline-none focus:outline-none focus:ring w-full"
							type="text"
							placeholder="Please enter username"
						/>
					</div>
					<div class="mb-3">
						<input
							class="rounded border-1 shadow-sm outline-none focus:outline-none focus:ring w-full"
							type="password"
							placeholder="Please enter password"
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<div class="modalBackdrop hidden opacity-25 fixed inset-0 z-40 bg-black" on:click={closeModal} />
