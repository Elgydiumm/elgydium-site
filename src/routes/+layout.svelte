<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores'; // Import the current page store
    import TopBar from '$lib/TopBar.svelte';
    import { derived, get } from 'svelte/store';

    let hamburgerOpen = false;

    function toggleHamburger() {
        hamburgerOpen = !hamburgerOpen;
    }

    const isMobile = browser && window.innerWidth <= 768;

    const currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<main>
    <TopBar />
    <div class="page">
        <slot />
    </div>
</main>

<style>    
    :root {
        /*Page Colors*/
        --background-color: #000000;
        --unselected-color: #c9c9c9;
        --selected-color: #1eff00;
        --main-color: #181818;
        --job-color: #2dc918;
        --timeline-color: rgb(30, 255, 0);

        --ff: 'Cutive Mono', monospace;
        font-family: 'Cutive Mono', monospace;
        line-height: 1.5;
        font-weight: 400;

        --h: bold 5rem var(--ff);
        --h1: bold 3.5rem var(--ff);
        --h2: bold 2.5rem var(--ff);
        --h3: bold 1.5rem var(--ff);
        --h4: bold 1.25rem var(--ff);
        --h5: bold 1rem var(--ff);

        --pl: 1.5rem var(--ff);
        --p: 1rem var(--ff);

        --gray100: hsl(0, 0%, 100%);
        --gray90: hsl(0, 0%, 90%);
        --gray80: hsl(0, 0%, 80%);
        --gray70: hsl(0, 0%, 70%);
        --gray0: hsl(0, 0%, 0%);

        
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: var(--background-color);

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    main {
        position: relative;
    }

    .page {
        margin-top: 80px;
        position: relative;
        z-index: 2;
    }
</style>