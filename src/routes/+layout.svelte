<div class="absolute w-full h-full flex flex-col">
	<div class="bg-blue-500 w-full p-4 relative">
		<ul class="flex gap-4 font-bold text-white">
			<li>
				<h1 class="text-white">Home</h1>
			</li>
			<li class="underline">
				<a href="/user">My User</a>
			</li>
			<li class="underline">
				<a href="/event">Events</a>
			</li>
		</ul>
	</div>
	<main class="p-10 bg-slate-700 w-full h-full text-white relative overflow-auto">
		<slot />
	</main>
</div>
