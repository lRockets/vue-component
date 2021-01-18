<template>
	<div class="about">
		1
		<hello></hello>
	</div>
</template>

<script>
	import hello from '@/components/hello.vue';
	export default {
		components: {
			hello
		},
		mounted() {
			// let com = this.findComponentDownward(this, 'ab');
		},
		methods: {
			findComponentDownward(context, componentName) {
				const childrens = context.$children;
				let children = null;

				if (childrens.length) {
					for (const child of childrens) {
						const name = child.$options.name;

						if (name === componentName) {
							children = child;
							break;
						} else {
							children = this.findComponentDownward(child, componentName);
							if (children) break;
						}
					}
				}
				return children;
			}
		}
	}
</script>
