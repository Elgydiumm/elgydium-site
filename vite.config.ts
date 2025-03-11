import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin";


export default defineConfig({
	plugins: [
	  precompileIntl("locales"), // Ensure translations are precompiled
	  sveltekit(),
	],
  });